import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../errors/errorMessage";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../lib/errorHandler";

/**TODO
 * 1. ルームを全て取得する
 * 2. ページネーション、フィルタリング、ソートを実装する
 */
export const getAllRooms = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      itemsPerPage = 20,
      sortBy = "latest",
      minPrice,
      maxPrice,
      zone,
      areaId,
      statusId,
      minMonth,
      maxMonth,
      minHousePeople,
      maxHousePeople,
      minKitchenPeople,
      maxKitchenPeople,
      minBathPeople,
      maxBathPeople,
      minStationTime,
      maxStationTime,
      preferredMoveInDate,
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
      stationId,
      keyword,
    } = req.query;

    /**
     * ソート DONE
     * 1. 金額の昇順
     * 2. 金額の降順
     * 3. 新着順
     */
    let orderBy: Prisma.RoomOrderByWithRelationInput;
    switch (sortBy) {
      case "price-asc":
        orderBy = { rent: "asc" };
        break;
      case "price-desc":
        orderBy = { rent: "desc" };
        break;
      case "latest":
        orderBy = { createdAt: "asc" };
        break;
      default:
        orderBy = { createdAt: "asc" };
        break;
    }

    /**
     * フィルタリング
     * 1. 認証済みの物件のみ
     * 2. クエリ条件に応じてフィルタリング
     * 3. 休止中の物件を表示しない
     * 4. キーワード検索
     */

    const where: Prisma.RoomWhereInput = {};
    // 認証済みの物件のみ
    where.isApproved = true;

    //　クエリ条件に応じてフィルタリング
    if (minPrice || maxPrice) {
      where.rent = {};
      if (minPrice) {
        where.rent.gte = Number(minPrice);
      }
      if (maxPrice) {
        where.rent.lte = Number(maxPrice);
      }
    }

    if (zone || areaId || minStationTime || maxStationTime || stationId) {
      where.property = { ...(where.property || {}) };
      if (zone) {
        where.property.zone = Number(zone);
      }
      if (areaId) {
        where.property.areaId = Number(areaId);
      }
      if (minStationTime || maxStationTime) {
        where.property.closestStationDuration = {};
        if (minStationTime) {
          where.property.closestStationDuration.gte = Number(minStationTime);
        }
        if (maxStationTime) {
          where.property.closestStationDuration.lte = Number(maxStationTime);
        }
      }

      if (stationId) {
        where.property.closestStationId = Number(stationId);
      }
    }
    if (statusId) {
      where.statusId = Number(statusId);
    }
    if (minMonth || maxMonth) {
      where.minStay = {};
      if (minMonth) {
        where.minStay.gte = Number(minMonth);
      }
      if (maxMonth) {
        where.minStay.lte = Number(maxMonth);
      }
    }

    if (minHousePeople || maxHousePeople) {
      where.housemateShareCount = {};
      if (minHousePeople) {
        where.housemateShareCount.gte = Number(minHousePeople);
      }
      if (maxHousePeople) {
        where.housemateShareCount.lte = Number(maxHousePeople);
      }
    }

    if (minKitchenPeople || maxKitchenPeople) {
      where.kitchenShareCount = {};
      if (minKitchenPeople) {
        where.kitchenShareCount.gte = Number(minKitchenPeople);
      }
      if (maxKitchenPeople) {
        where.kitchenShareCount.lte = Number(maxKitchenPeople);
      }
    }

    if (minBathPeople || maxBathPeople) {
      where.bathroomShareCount = {};
      if (minBathPeople) {
        where.bathroomShareCount.gte = Number(minBathPeople);
      }
      if (maxBathPeople) {
        where.bathroomShareCount.lte = Number(maxBathPeople);
      }
    }

    if (gym) where.hasGym = gym === "true";
    if (sauna) where.hasSauna = sauna === "true";
    if (pool) where.hasPool = pool === "true";
    if (couple) where.isCouple = couple === "true";
    if (utilities) where.utilitiesIncluded = utilities === "true";
    if (laundry) where.hasLaundry = laundry === "true";
    if (wifi) where.hasWifi = wifi === "true";
    if (lock) where.hasLock = lock === "true";
    if (man) where.isMaleOnly = man === "true";
    if (woman) where.isFemaleOnly = woman === "true";

    if (preferredMoveInDate && typeof preferredMoveInDate === "string") {
      const preferredMoveInDateObj = new Date(preferredMoveInDate);
      where.AND = [
        {
          OR: [
            // moveInDate がある場合: moveInDate が preferredMoveInDate 以前
            {
              moveInDate: { lte: preferredMoveInDateObj },
            },
            // moveInDate がなく、moveOutDate がある場合: moveOutDate が preferredMoveInDate 以降
            {
              moveInDate: null,
              moveOutDate: { lte: preferredMoveInDateObj },
            },
          ],
        },
        {
          // moveInDate と moveOutDate のどちらかは必ず null ではない
          OR: [{ moveInDate: { not: null } }, { moveOutDate: { not: null } }],
        },
      ];
    }

    /**
     * キーワード検索
     * 1. 各値から空白を削除。
     * 2. キーワードから空白を削除し、小文字に変換。
     * 3. いずれかのフィールドの値（小文字）がキーワード（小文字）を含むかどうかを判定。
     * 4. mode:Insensitive で大文字小文字を区別しないを念のため指定
     */

    if (keyword && typeof keyword === "string") {
      const keywordWithoutSpaces = keyword
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ""); // 空白を除去し、小文字に変換

      where.OR = [
        { roomName: { contains: keywordWithoutSpaces, mode: "insensitive" } },
        {
          property: {
            title: { contains: keywordWithoutSpaces, mode: "insensitive" },
          },
        },
        {
          property: {
            area: {
              name: { contains: keywordWithoutSpaces, mode: "insensitive" },
            },
          },
        },
        {
          property: {
            closestStation: {
              name: { contains: keywordWithoutSpaces, mode: "insensitive" },
            },
          },
        },
        {
          status: {
            name: { contains: keywordWithoutSpaces, mode: "insensitive" },
          },
        },
      ];
    }

    /**
     * ページネーション
     */
    const skip = (Number(page) - 1) * Number(itemsPerPage);

    // roomsテーブルから全てのプロパティを取得
    const allProperties = await prisma.room.findMany({
      where,
      orderBy,
      skip,
      take: Number(itemsPerPage),
      include: {
        property: {
          include: {
            area: { select: { name: true } },
            closestStation: { select: { name: true } },
            country: { select: { name: true } },
            owner: { select: { name: true } },
            rentPaymentMethod: { select: { name: true } },
          },
        },
        status: { select: { name: true } },
      },
    });

    // 検索結果が0件の場合は空配列を返す
    res.status(200).json(allProperties);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const getRoomById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
    });
    if (!property) {
      res.status(404).json({ message: ERROR_MESSAGE.API.NOT_FOUND });
      return;
    }
    res.json(property);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

/**
 * 新規のRoomを登録するController
 *
 * 必須:
 * - propertyId (number)
 * - statusId (number)
 * - countryId (number)
 * - roomName (string)
 * - rent (number)
 * - deposit (number)
 * - isApproved (boolean)
 * - updatedAt (Date) ※ createdAt はデフォルトでCURRENT_TIMESTAMPとなるため不要
 *
 * その他、任意のフィールドもリクエストボディから受け付けます。
 */
export const registerRoom = async (req: Request, res: Response) => {
  try {
    // リクエストボディから必要なフィールドを抽出
    const {
      propertyId,
      statusId,
      countryId,
      roomName,
      rent,
      deposit,
      isApproved,
      // 任意項目
      moveOutDate,
      moveInDate,
      thumbnailUrl,
      googlePhotoUrl,
      minStay,
      isFemaleOnly,
      isMaleOnly,
      hasGym,
      hasPool,
      hasSauna,
      isCouple,
      utilitiesIncluded,
      hasLaundry,
      hasWifi,
      hasLock,
      housemateShareCount,
      bathroomShareCount,
      kitchenShareCount,
      staffComment,
      areaDescription,
      restaurantDescription,
      groceryDescription,
      otherDescription,
    } = req.body;

    // 必須項目のチェック
    if (
      propertyId === undefined ||
      statusId === undefined ||
      countryId === undefined ||
      !roomName ||
      rent === undefined ||
      deposit === undefined ||
      isApproved === undefined
    ) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.VALIDATION.REQUIRED });
    }

    // FKのidの存在チェック
    const [property, status, country] = await Promise.all([
      prisma.property.findUnique({
        where: { id: Number(propertyId) },
      }),
      prisma.status.findUnique({
        where: { id: Number(statusId) },
      }),
      prisma.country.findUnique({
        where: { id: Number(countryId) },
      }),
    ]);

    if (!property) {
      res
        .status(404)
        .json({ message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("物件のID") });
      return;
    }
    if (!status) {
      res.status(404).json({
        message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("ステータスのID"),
      });
      return;
    }
    if (!country) {
      res
        .status(404)
        .json({ message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("国のID") });
      return;
    }

    // 新規Room登録のためのデータを作成
    const roomData = {
      propertyId: Number(propertyId),
      statusId: Number(statusId),
      countryId: Number(countryId),
      roomName,
      rent: Number(rent),
      deposit: Number(deposit),
      isApproved: Boolean(isApproved),
      updatedAt: new Date(), // 現在時刻を設定

      // 任意項目は値が存在する場合にのみ設定する
      moveOutDate: moveOutDate ? new Date(moveOutDate) : undefined,
      moveInDate: moveInDate ? new Date(moveInDate) : undefined,
      thumbnailUrl: thumbnailUrl || undefined,
      googlePhotoUrl: googlePhotoUrl || undefined,
      minStay: minStay !== undefined ? Number(minStay) : undefined,
      isFemaleOnly:
        isFemaleOnly !== undefined ? Boolean(isFemaleOnly) : undefined,
      isMaleOnly: isMaleOnly !== undefined ? Boolean(isMaleOnly) : undefined,
      hasGym: hasGym !== undefined ? Boolean(hasGym) : undefined,
      hasPool: hasPool !== undefined ? Boolean(hasPool) : undefined,
      hasSauna: hasSauna !== undefined ? Boolean(hasSauna) : undefined,
      isCouple: isCouple !== undefined ? Boolean(isCouple) : undefined,
      utilitiesIncluded:
        utilitiesIncluded !== undefined
          ? Boolean(utilitiesIncluded)
          : undefined,
      hasLaundry: hasLaundry !== undefined ? Boolean(hasLaundry) : undefined,
      hasWifi: hasWifi !== undefined ? Boolean(hasWifi) : undefined,
      hasLock: hasLock !== undefined ? Boolean(hasLock) : undefined,
      housemateShareCount:
        housemateShareCount !== undefined
          ? Number(housemateShareCount)
          : undefined,
      bathroomShareCount:
        bathroomShareCount !== undefined
          ? Number(bathroomShareCount)
          : undefined,
      kitchenShareCount:
        kitchenShareCount !== undefined ? Number(kitchenShareCount) : undefined,
      staffComment: staffComment || undefined,
      areaDescription: areaDescription || undefined,
      restaurantDescription: restaurantDescription || undefined,
      groceryDescription: groceryDescription || undefined,
      otherDescription: otherDescription || undefined,
    };

    // Prismaを使ってroomsテーブルへレコードを作成
    const newRoom = await prisma.room.create({
      data: roomData,
    });

    return res.status(201).json(newRoom);
  } catch (error) {
    // エラーハンドリング
    return handlePrismaError(error, res);
  }
};
