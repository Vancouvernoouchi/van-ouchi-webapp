"use client";

import { ErrorMessage } from "@/components/common/message";
import { ERRORS, MESSAGES } from "@/constants/common";

const ChinesePageError = () => {
  return <ErrorMessage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default ChinesePageError;
