/*
  Warnings:

  - You are about to drop the column `faturaURL` on the `Fatura` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fatura" DROP COLUMN "faturaURL",
ADD COLUMN     "UrlFatura" TEXT,
ADD COLUMN     "nomeFatura" TEXT;
