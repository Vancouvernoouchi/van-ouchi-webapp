/**
 * meetup controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::meetup.meetup",
  ({ strapi }) => ({
    async find(ctx) {
      ctx.query = {
        ...ctx.query,
        populate: {
          image: { fields: ["url"] },
        },
      };
      return await super.find(ctx);
    },

    async findOne(ctx) {
      const documentId = ctx.params.id;

      const entity = await strapi.documents("api::meetup.meetup").findOne({
        documentId,
        populate: {
          image: { fields: ["url"] },
          categories: true,
          faq: true,
          organizer: {
            populate: {
              avatar: {
                fields: ["url"],
              },
            },
          },
        },
      });

      if (!entity) {
        return ctx.notFound("該当するブログが見つかりません");
      }

      return entity;
    },
  })
);
