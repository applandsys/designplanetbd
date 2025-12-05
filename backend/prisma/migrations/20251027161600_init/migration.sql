/*
  Warnings:

  - Added the required column `ticketId` to the `ticketReponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticketReponse" ADD COLUMN     "ticketId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ticketReponse" ADD CONSTRAINT "ticketReponse_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "supportTicket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
