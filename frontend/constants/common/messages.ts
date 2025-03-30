export const MESSAGES = {
  NO_DATA: "該当するデータが存在しません。",
  ERROR_LOADING: (name: string) => `${name}の読み込みに失敗しました。`,
  PREPARING: (name: string) => `現在、${name}は準備中です。`,

  ///////// 入力バリデーションエラー /////////
  INPUT_REQUIRED: (name: string) => `${name}を入力してください。`,
  SELECT_REQUIRED: (name: string) => `${name}を選択してください。`,

  ///////// HTTPエラー /////////
  /** ユーザーが誤った形式でリクエストを送信した場合 */
  ERROR_BAD_REQUEST: [
    "リクエストの形式が不正です。",
    "入力内容を再確認して、もう一度お試しください。",
  ],
  /** ユーザーが認証されていない、またはログインしていない状態でアクセスを試みた場合 */
  ERROR_UNAUTHORIZED: [
    "ログインしていないか、セッションが切れた可能性があります。",
    "再度ログインしてください。",
  ],

  /** ユーザーがアクセスする権限を持っていない場合 */
  ERROR_FORBIDDEN: [
    "アクセスが拒否されました。",
    "このページやリソースにアクセスする権限がありません。",
    "必要な権限を持っているか確認してください。",
  ],

  /** ユーザーが存在しないページやリソースにアクセスしようとした場合 */
  ERROR_NOT_FOUND: [
    "データが見つかりませんでした。",
    "指定されたページやリソースが存在しないか、削除された可能性があります。",
    "URLが正しいか再度確認してください。",
  ],

  /** ユーザーがサポートされていないHTTPメソッドを使用した場合 */
  ERROR_METHOD_NOT_ALLOWED: [
    "許可されていない操作です。",
    "リクエスト方法が間違っています。別の方法で試してください。",
  ],

  /** 他のユーザーによるデータの競合が発生した場合 */
  ERROR_CONFLICT: [
    "データの更新に失敗しました。",
    "他のユーザーが同じデータを編集中です。",
    "しばらくしてから再度お試しください。",
  ],

  /** ユーザーが短時間に過剰なリクエストを送信した場合 */
  ERROR_TOO_MANY_REQUESTS: [
    "リクエストが多すぎます。",
    "一定時間内に過剰なリクエストが送信されました。",
    "しばらくしてから再度お試しください。",
  ],

  /** サーバー側のエラーが発生した場合 */
  ERROR_INTERNAL_SERVER_ERROR: [
    "サーバーに問題が発生しました。",
    "しばらくしてから再度お試しください。",
  ],

  /** サーバーが一時的に利用できない場合（メンテナンスや高負荷など） */
  ERROR_SERVICE_UNAVAILABLE: [
    "現在、サービスは利用できません。",
    "サーバーが一時的に利用できない状態です。",
    "しばらくしてから再度お試しください。",
  ],

  ERROR_UNEXPECTED: [
    "予期しないエラーが発生しました。",
    "しばらくしてから再度お試しください。",
  ],
} as const satisfies {
  [key: string]:
    | string
    | string[]
    | { (arg: string): string }
    | { (arg: number): string };
};

export const RESPONSE_CODES = {
  SUCCESS: 200,
  ERROR_BAD_REQUEST: 400,
  ERROR_UNAUTHORIZED: 401,
  ERROR_FORBIDDEN: 403,
  ERROR_NOT_FOUND: 404,
  ERROR_METHOD_NOT_ALLOWED: 405,
  ERROR_CONFLICT: 409,
  ERROR_TOO_MANY_REQUESTS: 429,
  ERROR_INTERNAL_SERVER_ERROR: 500,
  ERROR_SERVICE_UNAVAILABLE: 503,
  ERROR_UNEXPECTED: 999,
};

/**
 * APIのレスポンスステータスに応じたエラーメッセージを返す
 *
 * @param status {number} レスポンスステータスコード
 * @returns メッセージ
 */
export function generateMessages(status?: number | null): string[] {
  switch (status) {
    case 400:
      return MESSAGES.ERROR_BAD_REQUEST;
    case 401:
      return MESSAGES.ERROR_UNAUTHORIZED;
    case 403:
      return MESSAGES.ERROR_FORBIDDEN;
    case 404:
      return MESSAGES.ERROR_NOT_FOUND;
    case 405:
      return MESSAGES.ERROR_METHOD_NOT_ALLOWED;
    case 409:
      return MESSAGES.ERROR_CONFLICT;
    case 429:
      return MESSAGES.ERROR_TOO_MANY_REQUESTS;
    case 500:
      return MESSAGES.ERROR_INTERNAL_SERVER_ERROR;
    case 503:
      return MESSAGES.ERROR_SERVICE_UNAVAILABLE;
    default:
      return MESSAGES.ERROR_UNEXPECTED;
  }
}
