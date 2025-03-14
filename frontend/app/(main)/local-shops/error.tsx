"use client";

import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/common";

const LocalShopPageError = () => {
  return <ErrorPage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default LocalShopPageError;
