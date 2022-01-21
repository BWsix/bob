import { resolver } from "blitz";
import db from "db";
import { DeleteFile } from "../validations";

export default resolver.pipe(
  resolver.zod(DeleteFile),
  resolver.authorize("USER"),
  async ({ fileId }, { session: { userId } }) => {
    const file = await db.file.deleteMany({ where: { id: fileId, userId } });

    return file;
  }
);
