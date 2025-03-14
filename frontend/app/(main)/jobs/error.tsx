"use client";

import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common";

const JobPageError = () => {
  return <ErrorMessage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default JobPageError;
