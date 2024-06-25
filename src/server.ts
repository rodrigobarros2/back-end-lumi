import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const EnergiaSchema = z.object({
    consumoKWh: z.number(),
    valor: z.number(),
});

const FaturaSchema = z.object({
    numeroCliente: z.string(),
    mesReferencia: z.string(),
    energiaEletrica: EnergiaSchema,
    energiaScee: EnergiaSchema,
    energiaCompensada: EnergiaSchema,
    contribilum: z.number(),
    faturaURL: z.string().optional(),
});

app.post("/faturas", async (req: Request, res: Response) => {
    try {
        const {
            numeroCliente,
            mesReferencia,
            energiaEletrica,
            energiaScee,
            energiaCompensada,
            contribilum,
            faturaURL,
        } = FaturaSchema.parse(req.body);

        const novaFatura = await prisma.fatura.create({
            data: {
                numeroCliente,
                mesReferencia,
                energiaEletrica,
                energiaScee,
                energiaCompensada,
                contribilum,
                faturaURL,
            },
        });

        res.json(novaFatura);
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/faturas", async (req: Request, res: Response) => {
    try {
        const faturas = await prisma.fatura.findMany();
        res.json(faturas);
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar as faturas" });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
