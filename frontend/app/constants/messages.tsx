export const MESSAGES = {
  ERROR: "エラーが発生しました。", // catchされたエラー
  ERROR_SERVER: "サーバーでエラーが発生しました。", // !response.okの時のエラー
  ERROR_UNEXPECTED: "予期せぬエラーが発生しました。",
  ERROR_NO_DATA: "該当するデータが存在しません。", // 検索等で条件に合わない
  ERROR_NOT_FOUND: (name: string) =>
    `${name}が見つかりませんでした。URLをお確かめください。`,

  ERROR_REQUIRED: (requiredField: string) =>
    `${requiredField}を入力してください。`,
} as const;