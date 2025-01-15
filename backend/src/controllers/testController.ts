import { Request, Response } from "express";
import { ERROR_MESSAGE } from "../errors/errorMessage";
import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../lib/errorHandler";

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    /**TODO
     * 1. Done: プロパティを全て取得する
     * 2. Done: ページネーション、フィルタリング、ソートを実装する
     */
    const allProperties = await prisma.property.findMany();
    if (allProperties.length === 0) {
      res.status(404).json({ message: ERROR_MESSAGE.API.INVALID });
      return;
    }
    res.json(allProperties);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
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
