import { Request, Response } from "express";
import { handlePrismaError } from "../lib/errorHandler";
import { ERROR_MESSAGE } from "../errors/errorMessage";
import prisma from "../lib/prisma";

export const registerProperty = async (req: Request, res: Response) => {
  try {
    // リクエストボディから必要なフィールドを抽出
    const {
      ownerId,
      areaId,
      closestStationId,
      countryId,
      rentPaymentMethodId,
      title,
      street,
      city,
      province,
      postalCode,
      zone,
      closestStationDuration,
      // 必須項目以外の任意項目
      otherTransportation,
      otherTransportationDuration,
      thumbnailUrl,
      googlePhotoUrl,
      houseRules,
      rentPaymentDay,
    } = req.body;

    // 必須項目のチェック;
    if (
      ownerId === undefined ||
      areaId === undefined ||
      closestStationId === undefined ||
      countryId === undefined ||
      rentPaymentMethodId === undefined ||
      title === undefined ||
      street === undefined ||
      city === undefined ||
      province === undefined ||
      postalCode === undefined ||
      zone === undefined ||
      closestStationDuration === undefined
    ) {
      return res
        .status(400)
        .json({ message: ERROR_MESSAGE.VALIDATION.REQUIRED });
    }

    // 外部キーの存在チェック
    const [owner, area, station, country, paymentMethod] = await Promise.all([
      prisma.owner.findUnique({ where: { id: Number(ownerId) } }),
      prisma.area.findUnique({ where: { id: Number(areaId) } }),
      prisma.closestStation.findUnique({
        where: { id: Number(closestStationId) },
      }),
      prisma.country.findUnique({ where: { id: Number(countryId) } }),
      prisma.paymentMethod.findUnique({
        where: { id: Number(rentPaymentMethodId) },
      }),
    ]);

    if (!owner) {
      res.status(404).json({
        message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("オーナーID"),
      });
      return;
    }

    if (!area) {
      res
        .status(404)
        .json({ message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("エリアID") });
      return;
    }

    if (!station) {
      res
        .status(404)
        .json({ message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("最寄駅ID") });
      return;
    }

    if (!country) {
      res
        .status(404)
        .json({ message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("国ID") });
      return;
    }

    if (!paymentMethod) {
      res.status(404).json({
        message: ERROR_MESSAGE.API.INDIVIDUAL_NOT_FOUND("支払い方法ID"),
      });
      return;
    }

    // 新規Propertyデータの作成
    const propertyData = {
      ownerId: Number(ownerId),
      areaId: Number(areaId),
      closestStationId: Number(closestStationId),
      countryId: Number(countryId),
      rentPaymentMethodId: Number(rentPaymentMethodId),
      title,
      street,
      city,
      province,
      postalCode: String(postalCode),
      zone: Number(zone),
      closestStationDuration: Number(closestStationDuration),
      updatedAt: new Date(),

      // 任意項目
      otherTransportation: otherTransportation || undefined,
      otherTransportationDuration: otherTransportationDuration
        ? Number(otherTransportationDuration)
        : undefined,
      thumbnailUrl: thumbnailUrl || undefined,
      googlePhotoUrl: googlePhotoUrl || undefined,
      houseRules: houseRules || undefined,
      rentPaymentDay: rentPaymentDay || undefined,
    };

    // Prismaでプロパティを作成
    const newProperty = await prisma.property.create({
      data: {
        ...propertyData,
        // created_atはデフォルト値を使用するため明示的に指定しない
      },
    });

    return res.status(201).json(newProperty);
  } catch (error) {
    return handlePrismaError(error, res);
  }
};
