"use client";

import { ErrorPage } from "@/components/common/page";
import { ERRORS, MESSAGES } from "@/constants/common";

const ChinesePageError = () => {
  return <ErrorPage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default ChinesePageError;
