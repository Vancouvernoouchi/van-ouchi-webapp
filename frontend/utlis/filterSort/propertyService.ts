import { NotionPage } from "@/types/notionTypes";
import {
  isAfterMoveInDate,
  isNumberWithinRange,
  isUnitValueWithinRange,
  matchKeyword,
  matchStation,
} from "./filterUtils";
import { getPropertyValue, matchParams } from "../getPropertyValue";
import { apiClient } from "@/config/apiClient";

export interface SearchParams {
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  zone?: string;
  area?: string;
  status?: string;
  minMonth?: string;
  maxMonth?: string;
  minSharePeople?: string;
  maxSharePeople?: string;
  minKitchenPeople?: string;
  maxKitchenPeople?: string;
  minBathPeople?: string;
  maxBathPeople?: string;
  minStationTime?: string;
  maxStationTime?: string;

  moveInDate?: string;

  kitchenPeople?: string;
  gym?: string;
  sauna?: string;
  pool?: string;
  couple?: string;
  utilities?: string;
  laundry?: string;
  wifi?: string;
  lock?: string;
  man?: string;
  woman?: string;
  station?: string;

  page?: string;
  keyword?: string; // search bar
}

export async function fetchAndFilterProperties(searchParams: SearchParams) {
  const {
    sort,
    minPrice,
    maxPrice,
    zone,
    area,
    status,
    minMonth,
    maxMonth,
    minSharePeople,
    maxSharePeople,
    minKitchenPeople,
    maxKitchenPeople,
    minBathPeople,
    maxBathPeople,
    minStationTime,
    maxStationTime,

    moveInDate,

    gym,
    sauna,
    pool,
    couple,
    utilities,
    laundry,
    wifi,
    lock,
    man,
    woman,
    station,

    page,
    keyword,
  } = searchParams;

  // cache for 5 mins
  // const properties = await apiClientFetch("/properties", {
  //   method: "GET",
  //   next: {
  //     revalidate: 300,
  //   },
  // });
  const { data: properties } = await apiClient.get(`/properties`);

  //Filter
  let filteredProperties: NotionPage[] = properties.filter((p: NotionPage) => {
    // レンジが決まっているもの
    const rent = p.properties.家賃.number || 0;
    const matchedRent = isNumberWithinRange(rent, minPrice, maxPrice);

    const sharePeople = getPropertyValue(
      p.properties.物件のシェア人数,
      "select"
    );
    const matchedSharePeople = isNumberWithinRange(
      sharePeople,
      minSharePeople,
      maxSharePeople
    );

    // カレンダー 入居可能日があればそちらを優先
    const moveInDay = getPropertyValue(p.properties.入居可能日, "date");
    const moveOutDay = getPropertyValue(p.properties.退去予定日, "date");
    const moveDay = moveInDay ? moveInDay : moveOutDay;
    const matchedMoveDay = isAfterMoveInDate(moveDay, moveInDate);

    // レンジの決まっているもの
    //大文字で、単位がNotionに埋め込まれているもの（3ヶ月、3分等）
    const stayMonth = getPropertyValue(p.properties.ミニマムステイ, "select");
    const matchedStayMonth = isUnitValueWithinRange(
      "ヶ月",
      stayMonth.toLowerCase(),
      minMonth,
      maxMonth
    );

    const stationTime = getPropertyValue(p.properties.最寄り駅まで, "select");
    const matchedStationTime = isUnitValueWithinRange(
      "分",
      stationTime.toLowerCase(),
      minStationTime,
      maxStationTime
    );

    //単位がNotionに埋め込まれていないもの
    const kitchenPeople = getPropertyValue(
      p.properties.キッチンのシェア人数,
      "select"
    );
    const matchedKitchenPeople = isNumberWithinRange(
      kitchenPeople,
      minKitchenPeople,
      maxKitchenPeople
    );

    const bathPeople = getPropertyValue(
      p.properties.バスルームのシェア人数,
      "select"
    );
    const matchedBathPeople = isNumberWithinRange(
      bathPeople,
      minBathPeople,
      maxBathPeople
    );

    // 選択制のもの
    const matchedZone = matchParams(zone, p.properties.ゾーン, "select");
    const matchedArea = matchParams(area, p.properties.エリア, "select");
    const matchedStatus = matchParams(
      status,
      p.properties.ステータス,
      "status"
    );

    // checkbox "true" or "false"
    const matchedGym = matchParams(gym, p.properties.ジム, "checkbox-filter");
    const matchedSauna = matchParams(
      sauna,
      p.properties.サウナ,
      "checkbox-filter"
    );
    const matchedPool = matchParams(
      pool,
      p.properties.プール,
      "checkbox-filter"
    );
    const matchedCouple = matchParams(
      couple,
      p.properties.カップル可,
      "checkbox-filter"
    );
    const matchedUtilities = matchParams(
      utilities,
      p.properties.光熱費込み,
      "checkbox-filter"
    );
    const matchedLaundry = matchParams(
      laundry,
      p.properties.ランドリー無料,
      "checkbox-filter"
    );
    const matchedWifi = matchParams(
      wifi,
      p.properties.Wifi込み,
      "checkbox-filter"
    );
    const matchedLock = matchParams(
      lock,
      p.properties.鍵付き,
      "checkbox-filter"
    );
    const matchedMan = matchParams(
      man,
      p.properties.男性限定,
      "checkbox-filter"
    );
    const matchedWoman = matchParams(
      woman,
      p.properties.女性限定,
      "checkbox-filter"
    );

    // 最寄駅 例外処理
    const matchedStation = matchStation(station, p.properties);

    // SearchBar検索
    const matchedKeyword = keyword ? matchKeyword(p.properties, keyword) : true;

    return (
      matchedZone &&
      matchedRent &&
      matchedMoveDay &&
      matchedArea &&
      matchedStatus &&
      matchedStayMonth &&
      matchedSharePeople &&
      matchedKitchenPeople &&
      matchedBathPeople &&
      matchedGym &&
      matchedSauna &&
      matchedPool &&
      matchedCouple &&
      matchedUtilities &&
      matchedLaundry &&
      matchedWifi &&
      matchedLock &&
      matchedMan &&
      matchedWoman &&
      matchedStation &&
      matchedStationTime &&
      matchedKeyword
    );
  });

  // Sort
  filteredProperties = sortProperties(filteredProperties, sort);

  // pagination
  const itemsPerPage: number = 20; // The number of items per page can be adjusted
  const currentPage: number = page ? parseInt(page) : 1;
  const totalPage: number = Math.ceil(filteredProperties.length / 20);
  const paginatedProperties: NotionPage[] = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // the total number of the properties
  const filteredPropertiesNumber: number = filteredProperties.length;

  return {
    filteredPropertiesNumber,
    paginatedProperties,
    currentPage,
    totalPage,
    itemsPerPage,
  };
}

// Sort function
function sortProperties(properties: NotionPage[], sort?: string): NotionPage[] {
  const sortedProperties = [...properties];

  switch (sort) {
    case "price-dec":
      sortedProperties.sort((a, b) => {
        const rentA = a.properties.家賃.number ?? 0;
        const rentB = b.properties.家賃.number ?? 0;
        return rentA - rentB;
      });
      break;
    case "price-asc":
      sortedProperties.sort((a, b) => {
        const rentA = a.properties.家賃.number ?? 0;
        const rentB = b.properties.家賃.number ?? 0;
        return rentB - rentA;
      });
      break;
    case "latest":
      sortedProperties.sort((a, b) => {
        const createdTimeA = new Date(a.created_time).getTime();
        const createdTimeB = new Date(b.created_time).getTime();

        if (createdTimeA === createdTimeB) {
          const titleA = getPropertyValue(a.properties.タイトル, "title") || "";
          const titleB = getPropertyValue(b.properties.タイトル, "title") || "";
          return titleA.localeCompare(titleB);
        }

        return createdTimeB - createdTimeA;
      });
      break;

    default:
      sortedProperties.sort((a, b) => {
        const createdTimeA = new Date(a.created_time).getTime();
        const createdTimeB = new Date(b.created_time).getTime();

        if (createdTimeA === createdTimeB) {
          const titleA = getPropertyValue(a.properties.タイトル, "title") || "";
          const titleB = getPropertyValue(b.properties.タイトル, "title") || "";
          return titleA.localeCompare(titleB);
        }

        return createdTimeB - createdTimeA;
      });
      break;
  }

  return sortedProperties;
}
