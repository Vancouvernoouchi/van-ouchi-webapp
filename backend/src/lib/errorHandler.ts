import { Prisma } from "@prisma/client";
import { Response } from "express";
import { ERROR_MESSAGE } from "../errors/errorMessage";

export const handlePrismaError = (error: any, res: Response) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Prismaのエラー
    if (error.code === "P2025") {
      res.status(404).json({ message: ERROR_MESSAGE.API.NOT_FOUND });
      return;
    } else {
      res.status(500).json({
        message: ERROR_MESSAGE.API.UNKNOWN_ERROR,
        error: error.message,
      });
      return;
    }
  } else if (error instanceof Error) {
    res.status(500).json({ message: error.message });
    return;
  } else {
    res.status(500).json({ message: ERROR_MESSAGE.API.UNKNOWN_ERROR });
  }
};
