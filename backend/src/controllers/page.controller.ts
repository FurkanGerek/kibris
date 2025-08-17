import type { Request, Response } from "express";
import db from "~/database";
import Page from "~/database/page.entity";

// Tüm sayfalar
export const getPage = async (req: Request, res: Response) => {
    try {
        const { title } = req.params
        const pageRepo = db.getRepository(Page);
        const pages = await pageRepo.findOne({ where: [{ title }] });
        res.status(200).json(pages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Yeni sayfa oluşturma
export const postPage = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const pageRepo = db.getRepository(Page);

        const existing = await pageRepo.findOneBy({ title });
        if (existing) return res.status(400).json({ message: "Sayfa zaten mevcut" });

        const page = pageRepo.create({
            title,
            content
        });

        await pageRepo.save(page);
        res.status(201).json(page);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Sayfa güncelleme
export const putPage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const pageRepo = db.getRepository(Page);

        const page = await pageRepo.findOneBy({ id: Number(id) });
        if (!page) return res.status(404).json({ message: "Sayfa bulunamadı" });

        page.title = title ?? page.title;
        page.content = content ?? page.content;


        await pageRepo.save(page);
        res.status(200).json(page);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Sayfa silme
export const deletePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const pageRepo = db.getRepository(Page);

        const page = await pageRepo.findOneBy({ id: Number(id) });
        if (!page) return res.status(404).json({ message: "Sayfa bulunamadı" });

        await pageRepo.remove(page);
        res.status(200).json({ message: "Sayfa silindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}
