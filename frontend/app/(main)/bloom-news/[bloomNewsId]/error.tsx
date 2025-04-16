"use client";
import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common/messages";

const BloomNewsDetailPageError = () => {
  return <ErrorMessage errorMessages={MESSAGES.ERROR_UNEXPECTED} />;
};

export default BloomNewsDetailPageError;
