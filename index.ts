import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" })); // depois coloque a URL do front-end
app.use(express.json());

app.post("/send-email", async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Formulário do Site" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Mensagem Portfólio de ${name}`,
            text: message,
            html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong></p><p>${message}</p>`
        });

        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});

export default app;
