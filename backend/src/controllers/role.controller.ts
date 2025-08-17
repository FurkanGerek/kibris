import type { Request, Response } from "express";
import db from "~/database";
import Role from "~/database/role.entity";

// Tüm rolleri getir
export const getRole = async (_req: Request, res: Response) => {
    try {
        const roleRepo = db.getRepository(Role);
        const roles = await roleRepo.find();
        res.status(200).json({ roles });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Yeni rol ekle
export const postRole = async (req: Request, res: Response) => {
    try {
        const {
            name,
            canCreatePost,
            canEditPost,
            canDeletePost,
            canApprovePost,
            canManageRoles,
            canManageCategories,
            canManageAnnouncements, // yeni alan
        } = req.body;

        const roleRepo = db.getRepository(Role);
        const existing = await roleRepo.findOneBy({ name });
        if (existing) return res.status(400).json({ message: "Rol zaten mevcut" });

        const role = roleRepo.create({
            name,
            canCreatePost: !!canCreatePost,
            canEditPost: !!canEditPost,
            canDeletePost: !!canDeletePost,
            canApprovePost: !!canApprovePost,
            canManageRoles: !!canManageRoles,
            canManageCategories: !!canManageCategories,
            canManageAnnouncements: !!canManageAnnouncements, // yeni alan
        });

        await roleRepo.save(role);
        res.status(201).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Var olan rolü güncelle
export const putRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            name,
            canCreatePost,
            canEditPost,
            canDeletePost,
            canApprovePost,
            canManageRoles,
            canManageCategories,
            canManageAnnouncements, // yeni alan
        } = req.body;

        const roleRepo = db.getRepository(Role);
        const role = await roleRepo.findOneBy({ id: Number(id) });
        if (!role) return res.status(404).json({ message: "Rol bulunamadı" });

        role.name = name ?? role.name;
        role.canCreatePost = canCreatePost ?? role.canCreatePost;
        role.canEditPost = canEditPost ?? role.canEditPost;
        role.canDeletePost = canDeletePost ?? role.canDeletePost;
        role.canApprovePost = canApprovePost ?? role.canApprovePost;
        role.canManageRoles = canManageRoles ?? role.canManageRoles;
        role.canManageCategories = canManageCategories ?? role.canManageCategories;
        role.canManageAnnouncements = canManageAnnouncements ?? role.canManageAnnouncements; // yeni alan

        await roleRepo.save(role);
        res.status(200).json(role);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}

// Rol sil
export const deleteRole = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const roleRepo = db.getRepository(Role);

        const role = await roleRepo.findOneBy({ id: Number(id) });
        if (!role) return res.status(404).json({ message: "Rol bulunamadı" });

        if (["superadmin", "admin"].includes(role.name)) {
            return res.status(403).json({ message: "Bu rol silinemez" });
        }

        await roleRepo.remove(role);
        res.status(200).json({ message: "Rol silindi" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
}
