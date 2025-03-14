const MESSAGES = {
  ERROR_UNEXPECTED: "予期せぬエラーが発生しました。",
  NO_DATA: "該当するデータが存在しません。",
  ERROR_LOADING: (name: string) => `${name}の読み込みに失敗しました。`,
  PREPAIRING: (name: string) => `現在、${name}は準備中です。`,
  INPUT_REQUIRED: (name: string) => `${name}を入力してください。`,
  SELECT_REQUIRED: (name: string) => `${name}を選択してください。`,
};

const ERRORS = {
  /** ユーザーが誤った形式でリクエストを送信した場合 */
  BAD_REQUEST: {
    code: 400,
    messages: [
      "リクエストの形式が不正です。",
      "入力内容を再確認して、もう一度お試しください。",
    ],
  },
  /** ユーザーが認証されていない、またはログインしていない状態でアクセスを試みた場合 */
  UNAUTHORIZED: {
    code: 401,
    messages: [
      "ログインしていないか、セッションが切れた可能性があります。",
      "再度ログインしてください。",
    ],
  },
  /** ユーザーがアクセスする権限を持っていない場合 */
  FORBIDDEN: {
    code: 403,
    name: "FORBIDDEN",
    messages: [
      "アクセスが拒否されました。",
      "このページやリソースにアクセスする権限がありません。",
      "必要な権限を持っているか確認してください。",
    ],
  },
  /** ユーザーが存在しないページやリソースにアクセスしようとした場合 */
  NOT_FOUND: {
    code: 404,
    messages: [
      "データが見つかりませんでした。",
      "指定されたページやリソースが存在しないか、削除された可能性があります。",
      "URLが正しいか再度確認してください。",
    ],
  },
  /** ユーザーがサポートされていないHTTPメソッドを使用した場合 */
  METHOD_NOT_ALLOWED: {
    code: 405,
    messages: [
      "許可されていない操作です。",
      "リクエスト方法が間違っています。別の方法で試してください。",
    ],
  },
  /** 他のユーザーによるデータの競合が発生した場合 */
  CONFLICT: {
    code: 409,
    messages: [
      "データの更新に失敗しました。",
      "他のユーザーが同じデータを編集中です。",
      "しばらくしてから再度お試しください。",
    ],
  },
  /** ユーザーが短時間に過剰なリクエストを送信した場合 */
  TOO_MANY_REQUESTS: {
    code: 429,
    messages: [
      "リクエストが多すぎます。",
      "一定時間内に過剰なリクエストが送信されました。",
      "しばらくしてから再度お試しください。",
    ],
  },
  /** サーバー側のエラーが発生した場合 */
  INTERNAL_SERVER_ERROR500: {
    code: 500,
    messages: [
      "予期しないエラーが発生しました。",
      "サーバーに問題が発生しました。",
      "しばらくしてから再度お試しください。",
    ],
  },
  /** サーバーが一時的に利用できない場合（メンテナンスや高負荷など） */
  SERVICE_UNAVAILABLE: {
    code: 503,
    messages: [
      "現在、サービスは利用できません。",
      "サーバーが一時的に利用できない状態です。",
      "しばらくしてから再度お試しください。",
    ],
  },

  UNEXPECTED: {
    code: 999,
    messages: [
      "予期しないエラーが発生しました。",
      "しばらくしてから再度お試しください。",
    ],
  },
};

/**
 * APIのレスポンスステータスに応じたエラーメッセージを返す
 *
 * @param status {number} レスポンスステータスコード
 * @returns メッセージ
 */
function generateMessages(status?: number): string[] {
  const error = Object.values(ERRORS).find((err) => err.code === status);

  if (error) {
    return error.messages;
  }

  return ERRORS.UNEXPECTED.messages;
}

export { MESSAGES, ERRORS, generateMessages };
