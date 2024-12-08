import React from "react";

const ErrorState = ({
  responseCode,
  errorMessage,
}: {
  responseCode?: string;
  errorMessage: string;
}) => {
  return (
    <div className="h-[88vh] p-2 flex flex-col justify-center items-center text-center text-red-500 text-xl">
      {responseCode && <div>エラー: {responseCode}</div>}
      <div>{errorMessage}</div>
    </div>
  );
};

export default ErrorState;
