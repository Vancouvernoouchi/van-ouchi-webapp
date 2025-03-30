"use client";

import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common/messages";

const TenantPageError = () => {
  return <ErrorMessage errorMessages={MESSAGES.ERROR_UNEXPECTED} />;
};

export default TenantPageError;
