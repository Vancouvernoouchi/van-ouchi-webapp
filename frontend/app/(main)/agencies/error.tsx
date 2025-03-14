"use client";

import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common";

const AgancyPageError = () => {
  return <ErrorMessage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default AgancyPageError;
