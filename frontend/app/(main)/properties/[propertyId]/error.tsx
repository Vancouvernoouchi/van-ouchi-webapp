"use client";

import ErrorPage from "@/components/common/page/ErrorPage";
import { MESSAGES } from "@/constants/messages";

const PropertyDetailPageError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR_UNEXPECTED} />;
};

export default PropertyDetailPageError;
