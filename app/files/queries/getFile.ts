import { GetFile } from "app/files/validations";
import { NotFoundError, resolver } from "blitz";
import db from "db";

export default resolver.pipe(
  resolver.zod(GetFile),
  resolver.authorize("USER"),
  async ({ fileId }, { session: { userId } }) => {
    const file = await db.file.findFirst({ where: { id: fileId, userId } });

    if (!file) throw new NotFoundError();

    return file;
  }
);
