const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.post("/faturas", upload.single("fatura"), async (req, res) => {
    const pdfFile = req.file;

    const {
        numeroCliente,
        mesReferencia,
        energiaEletricaQuantidade,
        energiaEletricaValor,
        energiaSceeeQuantidade,
        energiaSceeeValor,
        energiaCompensadaQuantidade,
        energiaCompensadaValor,
        contribIlumPublica,
    } = req.body;

    try {
        const fatura = await prisma.fatura.create({
            data: {
                numeroCliente,
                mesReferencia,
                energiaEletrica: {
                    energiaEletricaQuantidade: parseFloat(
                        energiaEletricaQuantidade
                    ),
                    energiaEletricaValor: parseFloat(energiaEletricaValor),
                },
                energiaSceee: {
                    energiaSceeeQuantidade: parseFloat(energiaSceeeQuantidade),
                    energiaSceeeValor: parseFloat(energiaSceeeValor),
                },
                energiaCompensada: {
                    energiaCompensadaQuantidade: parseFloat(
                        energiaCompensadaQuantidade
                    ),
                    energiaCompensadaValor: parseFloat(energiaCompensadaValor),
                },
                contribIlumPublica: parseFloat(contribIlumPublica),
                urlFatura: pdfFile.path,
                nomeFatura: pdfFile.originalname,
            },
        });
        res.json(fatura);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar a fatura" });
    }
});

app.get("/faturas", async (req, res) => {
    try {
        const faturas = await prisma.fatura.findMany();
        res.status(200).json(faturas);
    } catch (error) {
        console.error("Error fetching invoices:", error.message);
        res.status(500).send("Server error: " + error.message);
    }
});

app.get("/download/:id", async (req, res) => {
    const fileId = req.params.id;

    try {
        const fileRecord = await prisma.fatura.findUnique({
            where: { id: fileId },
        });

        console.log("🚀 ~ app.get ~ fileRecord:", fileRecord);

        if (!fileRecord) {
            return res.status(404).send("Arquivo não encontrado.");
        }

        res.download(fileRecord.urlFatura, fileRecord.nomeFatura, (err) => {
            if (err) {
                console.error("Erro ao fazer o download do arquivo:", err);
                res.status(500).send("Erro ao fazer o download do arquivo");
            }
        });
    } catch (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        res.status(500).send("Erro ao consultar o banco de dados.");
    }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
