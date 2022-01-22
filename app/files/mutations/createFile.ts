import { resolver } from "blitz";
import db from "db";
import { nanoid } from "nanoid";
import { CreateFile } from "../validations";

export default resolver.pipe(
  resolver.zod(CreateFile),
  resolver.authorize("USER"),
  async (input, { session: { userId } }) => {
    const id = await getNewId();

    const file = await db.file.create({
      data: {
        ...input,
        id,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return file;
  }
);

async function getNewId() {
  let id = nanoid(10);
  let existingFileWithSameId = await db.file.count({ where: { id } });

  while (existingFileWithSameId) {
    id = nanoid(10);
    existingFileWithSameId = await db.file.count({ where: { id } });
  }

  return id;
}
