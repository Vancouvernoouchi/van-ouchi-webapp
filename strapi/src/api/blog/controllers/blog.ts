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
        },
      };
      return await super.find(ctx);
    },

    async findOne(ctx) {
      const documentId = ctx.params.id;

      const entity = await strapi.documents("api::blog.blog").findOne({
        documentId,
        populate: {
          coverImage: { fields: ["url"] },
          contents: true,
          category: true,
          author: {
            populate: {
              avatar: {
                fields: ["url"],
              },
            },
          },
          metadata: true,
        },
      });

      if (!entity) {
        return ctx.notFound("該当するブログが見つかりません");
      }

      return entity;
    },
  })
);
