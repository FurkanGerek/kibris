"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.putRole = exports.postRole = exports.getRole = void 0;
const database_1 = __importDefault(require("../database"));
const role_entity_1 = __importDefault(require("../database/role.entity"));
// Tüm rolleri getir
const getRole = async (_req, res) => {
    try {
        const roleRepo = database_1.default.getRepository(role_entity_1.default);
        const roles = await roleRepo.find();
        res.status(200).json({ roles });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getRole = getRole;
// Yeni rol ekle
const postRole = async (req, res) => {
    try {
        const { name, canCreatePost, canEditPost, canDeletePost, canApprovePost, canManageRoles, canManageCategories, canManageAnnouncements, // yeni alan
         } = req.body;
        const roleRepo = database_1.default.getRepository(role_entity_1.default);
        const existing = await roleRepo.findOneBy({ name });
        if (existing)
            return res.status(400).json({ message: "Rol zaten mevcut" });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.postRole = postRole;
// Var olan rolü güncelle
const putRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, canCreatePost, canEditPost, canDeletePost, canApprovePost, canManageRoles, canManageCategories, canManageAnnouncements, // yeni alan
         } = req.body;
        const roleRepo = database_1.default.getRepository(role_entity_1.default);
        const role = await roleRepo.findOneBy({ id: Number(id) });
        if (!role)
            return res.status(404).json({ message: "Rol bulunamadı" });
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.putRole = putRole;
// Rol sil
const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        const roleRepo = database_1.default.getRepository(role_entity_1.default);
        const role = await roleRepo.findOneBy({ id: Number(id) });
        if (!role)
            return res.status(404).json({ message: "Rol bulunamadı" });
        if (["superadmin", "admin"].includes(role.name)) {
            return res.status(403).json({ message: "Bu rol silinemez" });
        }
        await roleRepo.remove(role);
        res.status(200).json({ message: "Rol silindi" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.deleteRole = deleteRole;
