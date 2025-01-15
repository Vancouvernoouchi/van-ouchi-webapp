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
    const { page = 1, itemsPerPage = 20, sortBy = "latest" } = req.query;

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

    // ページネーション

    // roomsテーブルから全てのプロパティを取得
    const allProperties = await prisma.room.findMany({
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
