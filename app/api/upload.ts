// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import { acceptedMimeTypes, fieldName, fileSizeLimit } from "app/files/constants";
import { drive } from "app/files/detaDrive";
import { getSession } from "blitz";
import db from "db";
import multer from "multer";
import { nanoid } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

interface UploadForm {
  file: {
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}

const attachmentSchema = z.string().length(10);

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (_, { mimetype }, cb) => {
    if (acceptedMimeTypes.includes(mimetype)) {
      return cb(null, true);
    }

    return cb({ name: "Error occurred", message: `Unsupported mimetype : ${mimetype}` });
  },
  limits: { fileSize: fileSizeLimit },
});

const handler = nextConnect<NextApiRequest & UploadForm, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(501).json({ error: `Sorry something Happened! (${err.message})` });
  },
  onNoMatch: (req, res, next) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
})
  .use(upload.single(fieldName))
  .post(async (req, res) => {
    const parsedFileId = attachmentSchema.safeParse(req.body.fileId);

    if (parsedFileId.success) {
      const file = req.file;
      const fileId = parsedFileId.data;
      const attachmentId = nanoid(10);
      const { userId } = await getSession(req, res);

      const isAuthor = await db.file.count({ where: { id: fileId, userId } });
      if (!isAuthor) {
        return res.status(403).json({ error: "Unauthorized action." });
      }

      const attachment = await db.attachment.create({
        data: {
          id: attachmentId,
          attachmentTitle: file.originalname,
          attachmentType: {
            connect: {
              fileExtensionName: file.mimetype.split("/")[1]!,
            },
          },
          file: {
            connect: {
              id: parsedFileId.data,
            },
          },
        },
      });

      await drive.put(attachmentId, {
        data: file.buffer,
        contentType: file.mimetype,
      });

      return res.status(200).json(attachment);
    } else {
      return res.status(400).json({ error: "Invalid Id." });
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
