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
      const { id } = ctx.params;

      const entity = await strapi.entityService.findOne("api::blog.blog", id, {
        populate: {
          coverImage: { fields: ["url"] },
          contents: true,
          category: true,
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
