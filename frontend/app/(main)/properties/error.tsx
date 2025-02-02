"use client";
import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/messages";

const PropertyListError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR_UNEXPECTED} />;
};

export default PropertyListError;
