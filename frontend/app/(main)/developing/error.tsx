"use client";
import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/common/messages";

const DevelopingPageError = () => {
  return <ErrorPage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default DevelopingPageError;
