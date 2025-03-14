"use client";
import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common/messages";

const DevelopingMessageError = () => {
  return <ErrorMessage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default DevelopingMessageError;
