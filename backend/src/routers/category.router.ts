import { Router } from "express";
import { getCategory, postCategory, putCategory, deleteCategory } from "~/controllers/category.controller";

import checkPermission from "~/middlewares/checkPermission.middleware";
import authMiddleware from "~/middlewares/auth.middleware";

const router = Router();

// Tüm kategorileri getir
router.get("/", getCategory);

// Yeni kategori ekle (yetki kontrolü)
router.post("/", authMiddleware, checkPermission("canManageCategories"), postCategory);

// Var olan kategoriyi güncelle
router.put("/:id", authMiddleware, checkPermission("canManageCategories"), putCategory);

// Kategoriyi sil
router.delete("/:id", authMiddleware, checkPermission("canManageCategories"), deleteCategory);

export default router;
