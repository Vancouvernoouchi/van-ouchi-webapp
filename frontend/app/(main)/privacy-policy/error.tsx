"use client";

import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/common";

const TermsAndConditionPageError = () => {
  return <ErrorPage errorMessages={MESSAGES.ERROR_UNEXPECTED} />;
};

export default TermsAndConditionPageError;
