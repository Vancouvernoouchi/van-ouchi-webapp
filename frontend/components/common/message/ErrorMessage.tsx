"use client";
import { useRouter } from "next/navigation";

const RETRY_CODES = [409, 429, 500, 503]; // 再試行ボタンを表示するエラーコード

function ErrorMessage({
  responseCode,
  errorMessages,
}: {
  responseCode?: number;
  errorMessages: string[] | string;
}) {
  const router = useRouter();

  const goBack = () => {
    if (
      window.history.length > 1 &&
      document.referrer.startsWith(window.location.origin)
    ) {
      // 履歴があり、かつ直前のページが同じドメイン内なら戻る
      router.back();
    } else {
      // それ以外の場合は /properties に遷移
      router.push("/properties");
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="pt-10 flex flex-col justify-center items-center gap-4 text-gray-900">
      <div className="flex flex-col justify-center items-center text-base font-medium">
        {Array.isArray(errorMessages) ? (
          errorMessages.map((message, index) => <p key={index}>{message}</p>)
        ) : (
          <p>{errorMessages}</p>
        )}
      </div>

      <div className="flex gap-4">
        {/* 再試行ボタン（特定のエラーコードのときのみ表示） */}
        {responseCode && RETRY_CODES.includes(responseCode) ? (
          <button
            className="text-bloom-red border-b border-bloom-red cursor-pointer hover:opacity-60"
            onClick={reloadPage}
          >
            再試行 / Retry
          </button>
        ) : (
          // 戻るボタン
          <button
            className="text-bloom-blue border-b border-bloom-blue cursor-pointer hover:opacity-60"
            onClick={goBack}
          >
            戻る / Back
          </button>
        )}
      </div>
    </div>
  );
}

export { ErrorMessage };
