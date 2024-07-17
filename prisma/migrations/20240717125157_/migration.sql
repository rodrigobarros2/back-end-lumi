/*
  Warnings:

  - You are about to drop the column `UrlFatura` on the `Fatura` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fatura" DROP COLUMN "UrlFatura",
ADD COLUMN     "urlFatura" TEXT;
