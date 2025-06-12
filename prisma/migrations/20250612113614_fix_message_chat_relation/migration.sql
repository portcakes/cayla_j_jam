/*
  Warnings:

  - You are about to drop the column `Id` on the `Message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_Id_fkey";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "Id",
ADD COLUMN     "chatId" TEXT;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE SET NULL ON UPDATE CASCADE;
