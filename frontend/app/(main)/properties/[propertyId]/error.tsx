"use client";
import { ErrorPage } from "@/components/common";
import { MESSAGES } from "@/constants/messages";

const PropertyDetailPageError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR_UNEXPECTED} />;
};

export default PropertyDetailPageError;
