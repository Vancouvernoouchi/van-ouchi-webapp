"use client";

import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common";

const MobileCarrierPageError = () => {
  return <ErrorMessage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default MobileCarrierPageError;
