import { paginate } from "blitz";
import { resolver } from "@blitzjs/rpc";
import db, { Prisma } from "db";

interface GetCharactersInput
  extends Pick<
    Prisma.CharacterFindManyArgs,
    "where" | "orderBy" | "skip" | "take"
  > {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCharactersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: characters,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.character.count({ where }),
      query: (paginateArgs) =>
        db.character.findMany({ ...paginateArgs, where, orderBy }),
    });

    return {
      characters,
      nextPage,
      hasMore,
      count,
    };
  }
);
