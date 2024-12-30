"use client";

import ErrorState from "@/components/atoms/common/ErrorState";

const TenantPageError = () => {
  return <ErrorState errorMessage="予期せぬエラーが発生しました。" />;
};

export default TenantPageError;
