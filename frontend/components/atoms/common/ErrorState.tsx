import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorState = ({
  responseCode,
  errorMessage,
  backTo,
}: {
  responseCode?: string;
  errorMessage: string;
  backTo?: string;
}) => {
  return (
    <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-red-500 text-xl">
      {responseCode && <div>エラー: {responseCode}</div>}
      <div>{errorMessage}</div>
      <Link href={backTo ?? "/properties"} className="pt-3">
        <Button>戻る</Button>
      </Link>
    </div>
  );
};

export default ErrorState;
