import { Router } from "express";
import {
    getAnnouncements,
    getAnnouncementById,
    postAnnouncement,
    putAnnouncement,
    deleteAnnouncement
} from "~/controllers/announcement.controller";

import authMiddleware from "~/middlewares/auth.middleware";
import checkPermission from "~/middlewares/checkPermission.middleware";

const router = Router();

// Tüm duyuruları getir
router.get("/", getAnnouncements);

// Tek duyuru getir
router.get("/:id", getAnnouncementById);

// Yeni duyuru ekle (yetkili kullanıcı)
router.post("/", authMiddleware, checkPermission("canManageAnnouncements"), postAnnouncement);

// Var olan duyuruyu güncelle
router.put("/:id", authMiddleware, checkPermission("canManageAnnouncements"), putAnnouncement);

// Duyuruyu sil
router.delete("/:id", authMiddleware, checkPermission("canManageAnnouncements"), deleteAnnouncement);

export default router;
