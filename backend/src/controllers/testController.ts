import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../errors/errorMessage";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../lib/errorHandler";

/**TODO
 * 1. Done: ルームを全て取得する
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
     * 2. その他の条件
     */

    const where: Prisma.RoomWhereInput = {};
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
      where.property = {}; // where.property を空オブジェクトで初期化
      if (zone) {
        where.property.zone = Number(zone);
      }
      if (areaId) {
        where.property.areaId = Number(areaId);
      }
      if (minStationTime) {
        where.property.closestStationDuration = {
          gte: Number(minStationTime),
        };
      }
      if (maxStationTime) {
        where.property.closestStationDuration = {
          lte: Number(maxStationTime),
        };
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

    // ページネーション

    // roomsテーブルから全てのプロパティを取得
    const allProperties = await prisma.room.findMany({
      where,
      orderBy,
      take: Number(itemsPerPage),
      include: { property: true },
    });
    if (allProperties.length === 0) {
      res.status(404).json({ message: ERROR_MESSAGE.API.INVALID });
      return;
    }
    res.json(allProperties);
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
