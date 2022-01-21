-- AlterTable
ALTER TABLE "File" ADD COLUMN     "categoryTypeId" INTEGER;

-- CreateTable
CREATE TABLE "CategoryType" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "CategoryType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryType_categoryName_key" ON "CategoryType"("categoryName");

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_categoryTypeId_fkey" FOREIGN KEY ("categoryTypeId") REFERENCES "CategoryType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
