export const ERROR_MESSAGE = {
  GENERAL: {
    UNEXPECTED: "予期しないエラーが発生しました。",
    NETWORK: "ネットワークエラーが発生しました。接続を確認してください。",
    FORBIDDEN: "このリソースにアクセスする権限がありません。",
    NOT_FOUND: "要求されたリソースが見つかりません。",
    TIMEOUT: "リクエストがタイムアウトしました。もう一度お試しください。",
  },
  VALIDATION: {
    REQUIRED: "必須項目が入力されていません。",
    INDIVIDUAL_REQUIRED: (fieldName: string) => `${fieldName}は必須項目です。`,
    INDIVIDUAL_INVALID: (fieldName: string) => `${fieldName}の値が無効です。`,
  },
  AUTH: {
    UNAUTHORIZED: "認証に失敗しました。再度ログインしてください。",
    TOKEN_EXPIRED:
      "セッションの有効期限が切れています。再度ログインしてください。",
  },
  SERVER: {
    INTERNAL: "サーバーエラーが発生しました。後でもう一度お試しください。",
    MAINTENANCE: "サーバーは現在メンテナンス中です。後ほどお試しください。",
  },
  API: {
    INVALID: "無効なリクエストです。",
    RATE_LIMIT: "リクエストが多すぎます。しばらくしてから再度お試しください。",
    UNKNOWN_ERROR: "不明なAPIエラーが発生しました。",
    DUPLICATE: "そのデータは既に存在しています。",
    NOT_FOUND: "データが見つかりません。",
    INDIVIDUAL_NOT_FOUND: (fieldName: string) =>
      `${fieldName}が見つかりません。`,
  },
};
