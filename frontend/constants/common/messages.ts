const MESSAGES = {
  ERROR_UNEXPECTED: ["予期せぬエラーが発生しました。"],
  NO_DATA: ["該当するデータが存在しません。"], // 検索等で条件に合わない
  ERROR_LOADING: (name: string) => [`${name}の読み込みに失敗しました。`],
  PREPAIRING: (name: string) => [`現在、${name}は準備中です。`],
  INPUT_REQUIRED: (name: string) => [`${name}を入力してください。`],
  SELECT_REQUIRED: (name: string) => [`${name}を選択してください。`],
};

const ERRORS = {
  BAD_REQUEST: {
    code: 400,
    messages: ["400 Bad Request", "リクエストが不正です。"],
  },
  UNAUTHORIZED: {
    code: 401,
    messages: ["401 Unauthorized", "認証が必要です。"],
  },
  FORBIDDEN: {
    code: 403,
    name: "FORBIDDEN",
    messages: ["403 Forbidden", "アクセスが拒否されました。"],
  },
  NOT_FOUND: {
    code: 404,
    messages: [
      "404 Not Found",
      "データが見つかりませんでした。",
      "URLをお確かめください。",
    ],
  },
  METHOD_NOT_ALLOWED: {
    code: 405,
    messages: ["405 Method Not Allowed", "許可されていないメソッドです。"],
  },
  CONFLICT: {
    code: 409,
    messages: ["409 Conflict", "他の人が同じデータを編集中しています。"],
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    messages: ["429 Too Many Requests", "リクエストが多すぎます。"],
  },
  INTERNAL_SERVER_ERROR500: {
    code: 500,
    messages: ["500 Internal Server Error", "サーバーエラーが発生しました。"],
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    messages: ["503 Service Unavailable", "サーバーが利用できません。"],
  },
  UNEXPECTED: {
    code: 99,
    messages: ["Unexpected Error", "予期せぬエラーが発生しました。"],
  },
};

/**
 * APIのレスポンスステータスに応じたエラーメッセージを返す
 *
 * @param status {number} レスポンスステータスコード
 * @returns メッセージ
 */
function generateMessages(status: number): string[] {
  const error = Object.values(ERRORS).find((err) => err.code === status);

  if (error) {
    return error.messages;
  }

  return ERRORS.UNEXPECTED.messages;
}

export { MESSAGES, ERRORS, generateMessages };
