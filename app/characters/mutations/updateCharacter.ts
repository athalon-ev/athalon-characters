import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const UpdateCharacter = z.object({
  id: z.number(),
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(UpdateCharacter),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const character = await db.character.update({ where: { id }, data });

    return character;
  }
);
