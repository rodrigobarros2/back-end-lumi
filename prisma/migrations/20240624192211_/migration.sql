-- CreateTable
CREATE TABLE "Fatura" (
    "id" TEXT NOT NULL,
    "numeroCliente" TEXT NOT NULL,
    "mesReferencia" TEXT NOT NULL,
    "energiaEletrica" JSONB NOT NULL,
    "energiaScee" JSONB NOT NULL,
    "energiaCompensada" JSONB NOT NULL,
    "contribilum" INTEGER NOT NULL,
    "faturaURL" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
