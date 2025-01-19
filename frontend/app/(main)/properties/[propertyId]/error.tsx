"use client";

import ErrorPage from "@/components/common/ErrorPage";
import { MESSAGES } from "@/constants/messages";

const PropertyDetailPageError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR_UNEXPECTED} />;
};

export default PropertyDetailPageError;
