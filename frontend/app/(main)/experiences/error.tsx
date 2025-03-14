"use client";

import { ErrorMessage } from "@/components/common/message";
import { MESSAGES } from "@/constants/common";

const ExperiencePageError = () => {
  return <ErrorMessage errorMessages={[MESSAGES.ERROR_UNEXPECTED]} />;
};

export default ExperiencePageError;
