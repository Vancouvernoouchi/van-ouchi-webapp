/**
 * blog controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          coverImage: { fields: ["url"] },
          category: true,
          metadata: true,
        },
      };
      return await super.find(ctx);
    },
  })
);
