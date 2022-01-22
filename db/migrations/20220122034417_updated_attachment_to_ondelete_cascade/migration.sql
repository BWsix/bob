-- DropForeignKey
ALTER TABLE "Attachment" DROP CONSTRAINT "Attachment_fileId_fkey";

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE CASCADE ON UPDATE CASCADE;
