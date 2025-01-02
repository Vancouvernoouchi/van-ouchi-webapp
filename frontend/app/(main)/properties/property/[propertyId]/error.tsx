"use client";

import ErrorPage from "@/components/atoms/common/ErrorPage";
import { MESSAGES } from "@/constants/messages";

const PreviousPropertyDetalPageError = () => {
  return <ErrorPage errorMessage={MESSAGES.ERROR_UNEXPECTED} />;
};

export default PreviousPropertyDetalPageError;
