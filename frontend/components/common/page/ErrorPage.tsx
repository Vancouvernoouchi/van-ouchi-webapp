"use client";
import { useRouter } from "next/navigation";

function ErrorPage({
  responseCode,
  errorMessage,
}: {
  responseCode?: number;
  errorMessage: string;
}) {
  const router = useRouter();

  const goBack = () => {
    if (window.history.length > 1) {
      // ブラウザ履歴がある場合は戻る
      router.back();
    } else {
      // 履歴がない場合は /properties に遷移
      router.push("/properties");
    }
  };

  return (
    <div className="pt-10 flex flex-col justify-center items-center gap-4 text-gray-900">
      <div className="flex flex-col justify-center items-center text-base font-medium">
        {responseCode && <p>Error {responseCode}</p>}
        <p>{errorMessage}</p>
      </div>

      <div
        className="text-bloom-blue border-b border-bloom-blue cursor-pointer hover:opacity-60"
        onClick={goBack}
      >
        戻る / Back
      </div>
    </div>
  );
}

export { ErrorPage };
