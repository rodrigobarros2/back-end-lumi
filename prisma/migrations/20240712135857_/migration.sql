/*
  Warnings:

  - The primary key for the `Fatura` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `clientNumber` on the `Fatura` table. All the data in the column will be lost.
  - You are about to drop the column `pdfPath` on the `Fatura` table. All the data in the column will be lost.
  - Added the required column `contribIlumPublica` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energiaCompensada` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energiaEletrica` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energiaSceee` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mesReferencia` to the `Fatura` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numeroCliente` to the `Fatura` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fatura" DROP CONSTRAINT "Fatura_pkey",
DROP COLUMN "clientNumber",
DROP COLUMN "pdfPath",
ADD COLUMN     "contribIlumPublica" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "energiaCompensada" JSONB NOT NULL,
ADD COLUMN     "energiaEletrica" JSONB NOT NULL,
ADD COLUMN     "energiaSceee" JSONB NOT NULL,
ADD COLUMN     "faturaURL" TEXT,
ADD COLUMN     "mesReferencia" TEXT NOT NULL,
ADD COLUMN     "numeroCliente" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3),
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Fatura_id_seq";
