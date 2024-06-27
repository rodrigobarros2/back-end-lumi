/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "clientNumber" TEXT NOT NULL,
    "pdfPath" TEXT NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
