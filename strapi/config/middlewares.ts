export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: ["https://www.van-ouchi.com"], // 許可するフロントエンドのURL
      methods: ["GET", "POST", "PUT", "DELETE"], // 許可するHTTPメソッド
      allowedHeaders: ["Content-Type", "Authorization"], // 許可するヘッダー
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
