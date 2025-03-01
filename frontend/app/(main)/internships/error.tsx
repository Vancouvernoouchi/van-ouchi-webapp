"use client";

import { ErrorPage } from "@/components/common/page";
import { MESSAGES } from "@/constants/common";

const InternShipPageError = () => {
  return <ErrorPage errorMessages={MESSAGES.ERROR_UNEXPECTED} />;
};

export default InternShipPageError;
