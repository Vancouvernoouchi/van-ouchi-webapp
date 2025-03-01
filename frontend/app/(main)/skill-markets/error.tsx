"use client";

import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/common";

const SkillMarketPageError = () => {
  return <ErrorPage errorMessages={MESSAGES.ERROR_UNEXPECTED} />;
};

export default SkillMarketPageError;
