"use client";
import { ErrorPage } from "@/components/common";
import { MESSAGES } from "@/constants/messages";

const DevelopingPageError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR} />;
};

export default DevelopingPageError;
