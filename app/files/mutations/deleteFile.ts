import { resolver } from "blitz";
import db from "db";
import { drive } from "../detaDrive";
import { DeleteFile } from "../validations";

export default resolver.pipe(
  resolver.zod(DeleteFile),
  resolver.authorize("USER"),
  async ({ fileId }, { session: { userId } }) => {
    const file = await db.file.findFirst({
      where: { id: fileId, userId },
      select: { attachment: { select: { id: true } } },
    });

    if (file?.attachment.length) {
      await drive.deleteMany(file.attachment.map(({ id }) => id));
    }

    await db.file.deleteMany({ where: { id: fileId, userId } });

    return file;
  }
);
