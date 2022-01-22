import { resolver } from "blitz";
import db from "db";
import { drive } from "../detaDrive";
import { UpdateFile } from "../validations";

export default resolver.pipe(
  resolver.zod(UpdateFile),
  resolver.authorize("USER"),
  async ({ fileId, ...data }) => {
    const file = await db.file.update({
      where: { id: fileId },
      data,
      include: {
        attachment: {
          select: {
            id: true,
          },
        },
      },
    });

    if (file?.attachment.length) {
      const attachmentIds = file.attachment.map(({ id }) => id) as string[];

      await drive.deleteMany(attachmentIds);
      await db.attachment.deleteMany({ where: { id: { in: attachmentIds } } });
    }

    return file;
  }
);
