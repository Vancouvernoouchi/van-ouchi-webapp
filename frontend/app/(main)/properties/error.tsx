"use client";
import { ErrorPage } from "@/components/common";
import { MESSAGES } from "@/constants/messages";

const PropertyListError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR_UNEXPECTED} />;
};

export default PropertyListError;
