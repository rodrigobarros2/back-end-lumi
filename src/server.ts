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

app.post("/faturas", upload.single("pdf"), async (req, res) => {
    try {
        const { clientNumber } = req.body;
        const pdfFile = req.file;

        if (!pdfFile) {
            return res.status(400).send("No file uploaded.");
        }

        const newEntry = await prisma.fatura.create({
            data: {
                clientNumber: clientNumber,
                pdfPath: pdfFile.path,
            },
        });

        res.status(200).json({
            message: "File uploaded successfully",
            entry: newEntry,
        });
    } catch (error) {
        console.error("Error uploading the file:", error.message);
        res.status(500).send("Server error: " + error.message);
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
            where: { id: parseInt(fileId) },
        });

        console.log("🚀 ~ app.get ~ fileRecord:", fileRecord);

        if (!fileRecord) {
            return res.status(404).send("Arquivo não encontrado.");
        }

        res.download(
            fileRecord.pdfPath,
            "AQUI É O NOME DO AQUIVO, ENTÃO COLOCA O .PDF",
            (err) => {
                if (err) {
                    console.error("Erro ao fazer o download do arquivo:", err);
                    res.status(500).send("Erro ao fazer o download do arquivo");
                }
            }
        );
    } catch (error) {
        console.error("Erro ao consultar o banco de dados:", error);
        res.status(500).send("Erro ao consultar o banco de dados.");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
