import type { Request, Response } from "express";
import db from "~/database";
import Announcement from "~/database/announcement.entity";

// Tüm duyuruları getir
export const getAnnouncements = async (req: Request, res: Response) => {
    try {
        const announcementRepo = db.getRepository(Announcement);
        const announcements = await announcementRepo.find({ order: { id: "DESC" } });
        res.status(200).json({ announcements });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Tek duyuru getir
export const getAnnouncementById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const announcementRepo = db.getRepository(Announcement);
        const announcement = await announcementRepo.findOne({ where: { id: Number(id) } });

        if (!announcement) return res.status(404).json({ error: "Duyuru bulunamadı" });

        res.status(200).json({ announcement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Yeni duyuru ekle
export const postAnnouncement = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Name alanı boş olamaz" });

        const announcementRepo = db.getRepository(Announcement);
        const announcement = announcementRepo.create({ name });
        await announcementRepo.save(announcement);

        res.status(201).json({ announcement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Duyuru güncelle
export const putAnnouncement = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const announcementRepo = db.getRepository(Announcement);
        const announcement = await announcementRepo.findOne({ where: { id: Number(id) } });

        if (!announcement) return res.status(404).json({ error: "Duyuru bulunamadı" });

        announcement.name = name ?? announcement.name;
        await announcementRepo.save(announcement);

        res.status(200).json({ announcement });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Duyuru sil
export const deleteAnnouncement = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const announcementRepo = db.getRepository(Announcement);
        const announcement = await announcementRepo.findOne({ where: { id: Number(id) } });

        if (!announcement) return res.status(404).json({ error: "Duyuru bulunamadı" });

        await announcementRepo.remove(announcement);
        res.status(200).json({ message: "Duyuru silindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
