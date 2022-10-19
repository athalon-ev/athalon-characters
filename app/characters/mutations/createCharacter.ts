import { resolver } from "@blitzjs/rpc";
import db from "db";
import { z } from "zod";

const CreateCharacter = z.object({
  name: z.string(),
});

export default resolver.pipe(
  resolver.zod(CreateCharacter),
  resolver.authorize(),
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const character = await db.character.create({ data: input });

    return character;
  }
);
