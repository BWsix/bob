import { resolver } from "blitz";
import db from "db";
import { UpdateFile } from "../validations";

export default resolver.pipe(
  resolver.zod(UpdateFile),
  resolver.authorize("USER"),
  async ({ fileId, ...data }) => {
    const file = await db.file.update({ where: { id: fileId }, data });

    return file;
  }
);
