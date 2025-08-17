"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.putAnnouncement = exports.postAnnouncement = exports.getAnnouncementById = exports.getAnnouncements = void 0;
const database_1 = __importDefault(require("../database"));
const announcement_entity_1 = __importDefault(require("../database/announcement.entity"));
// Tüm duyuruları getir
const getAnnouncements = async (req, res) => {
    try {
        const announcementRepo = database_1.default.getRepository(announcement_entity_1.default);
        const announcements = await announcementRepo.find({ order: { id: "DESC" } });
        res.status(200).json({ announcements });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getAnnouncements = getAnnouncements;
// Tek duyuru getir
const getAnnouncementById = async (req, res) => {
    try {
        const { id } = req.params;
        const announcementRepo = database_1.default.getRepository(announcement_entity_1.default);
        const announcement = await announcementRepo.findOne({ where: { id: Number(id) } });
        if (!announcement)
            return res.status(404).json({ error: "Duyuru bulunamadı" });
        res.status(200).json({ announcement });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getAnnouncementById = getAnnouncementById;
// Yeni duyuru ekle
const postAnnouncement = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name)
            return res.status(400).json({ error: "Name alanı boş olamaz" });
        const announcementRepo = database_1.default.getRepository(announcement_entity_1.default);
        const announcement = announcementRepo.create({ name });
        await announcementRepo.save(announcement);
        res.status(201).json({ announcement });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.postAnnouncement = postAnnouncement;
// Duyuru güncelle
const putAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const announcementRepo = database_1.default.getRepository(announcement_entity_1.default);
        const announcement = await announcementRepo.findOne({ where: { id: Number(id) } });
        if (!announcement)
            return res.status(404).json({ error: "Duyuru bulunamadı" });
        announcement.name = name ?? announcement.name;
        await announcementRepo.save(announcement);
        res.status(200).json({ announcement });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.putAnnouncement = putAnnouncement;
// Duyuru sil
const deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const announcementRepo = database_1.default.getRepository(announcement_entity_1.default);
        const announcement = await announcementRepo.findOne({ where: { id: Number(id) } });
        if (!announcement)
            return res.status(404).json({ error: "Duyuru bulunamadı" });
        await announcementRepo.remove(announcement);
        res.status(200).json({ message: "Duyuru silindi" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.deleteAnnouncement = deleteAnnouncement;
