// https://betterprogramming.pub/upload-files-to-next-js-with-api-routes-839ce9f28430

import { drive } from "app/files/detaDrive";
import { getSession } from "blitz";
import db from "db";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { z } from "zod";

const attachmentSchema = z.string().length(10);

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(501).json({ error: `Sorry something Happened! (${err.message})` });
  },
  onNoMatch: (req, res, next) => {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
}).get(async (req, res) => {
  const parsedAttachmentId = attachmentSchema.safeParse(req.query.id);

  if (parsedAttachmentId.success) {
    const attachmentId = parsedAttachmentId.data;

    const { userId } = await getSession(req, res);
    if (!userId) {
      return res.status(403).json({ error: "Unauthorized action." });
    }

    const isAuthor = await db.attachment.count({ where: { id: attachmentId, file: { userId } } });
    if (!isAuthor) {
      return res.status(403).json({ error: "Unauthorized action." });
    }

    const attachment = await drive.get(attachmentId);

    if (!attachment) {
      throw new Error("Attachment not found.");
    }

    res.writeHead(200, {
      "Content-Type": attachment.type,
      "Content-Length": attachment.size,
    });

    attachment.stream().pipe(res);
  } else {
    return res.status(400).json({ error: "Invalid Id." });
  }
});

export default handler;
