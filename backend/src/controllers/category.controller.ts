import type { Request, Response } from "express";
import db from "~/database";
import Category from "~/database/category.entity";

// Tüm kategorileri getir
export const getCategory = async (_req: Request, res: Response) => {
    try {
        const categoryRepo = db.getRepository(Category);
        const categories = await categoryRepo.find();
        res.status(200).json({ categories });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Yeni kategori ekle
export const postCategory = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const categoryRepo = db.getRepository(Category);

        const existing = await categoryRepo.findOneBy({ name });
        if (existing) return res.status(400).json({ message: "Kategori zaten mevcut" });

        const category = categoryRepo.create({ name }); // description kaldırıldı
        await categoryRepo.save(category);

        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Var olan kategoriyi güncelle
export const putCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const categoryRepo = db.getRepository(Category);

        const category = await categoryRepo.findOneBy({ id: Number(id) });
        if (!category) return res.status(404).json({ message: "Kategori bulunamadı" });

        category.name = name ?? category.name; // description kaldırıldı
        await categoryRepo.save(category);

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Kategoriyi sil
export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoryRepo = db.getRepository(Category);

        const category = await categoryRepo.findOneBy({ id: Number(id) });
        if (!category) return res.status(404).json({ message: "Kategori bulunamadı" });

        if (["default", "uncategorized"].includes(category.name.toLowerCase())) {
            return res.status(403).json({ message: "Bu kategori silinemez" });
        }

        await categoryRepo.remove(category);
        res.status(200).json({ message: "Kategori silindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
