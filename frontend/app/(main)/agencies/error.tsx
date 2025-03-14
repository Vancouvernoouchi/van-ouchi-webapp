"use client";

import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/common";

const AgancyPageError = () => {
  return <ErrorPage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default AgancyPageError;
