import { paginate, resolver } from "blitz";
import db, { Prisma } from "db";

interface GetFilesInput
  extends Pick<Prisma.FileFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize("USER"),
  async (
    { where: _where, orderBy, skip = 0, take = 100 }: GetFilesInput,
    { session: { userId } }
  ) => {
    const where = { ..._where, userId };

    const {
      items: files,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.file.count({ where }),
      query: (paginateArgs) =>
        db.file.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: { attachment: { select: { attachmentTitle: true } } },
        }),
    });

    return {
      files,
      nextPage,
      hasMore,
      count,
    };
  }
);
