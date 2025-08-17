"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.approvePost = exports.putPost = exports.postPost = exports.getByUser = exports.getByID = exports.getAll = void 0;
const database_1 = __importDefault(require("../database"));
const post_entity_1 = __importDefault(require("../database/post.entity"));
const getAll = async (req, res) => {
    try {
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const posts = await postRepository.find({
            relations: ["user", "category"],
            order: { id: "DESC" }
        });
        res.status(200).json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getAll = getAll;
const getByID = async (req, res) => {
    try {
        const { id } = req.params;
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const posts = await postRepository.findOne({
            where: { id: Number(id) },
            relations: ["user"],
            order: { id: "DESC" }
        });
        res.status(200).json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getByID = getByID;
const getByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const posts = await postRepository.find({
            where: { user: { id: Number(id) } },
            relations: ["user"],
            order: { id: "DESC" }
        });
        res.status(200).json({ posts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.getByUser = getByUser;
const postPost = async (req, res) => {
    try {
        const { header, content, categoryId } = req.body;
        const user = res.locals.user;
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const post = postRepository.create({
            header,
            content,
            user,
            category: categoryId
        });
        if (req.file) {
            post.cover = req.file.buffer;
        }
        await postRepository.save(post);
        res.status(200).json({ post });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.postPost = postPost;
const putPost = async (req, res) => {
    try {
        const { id } = req.params; // URL'den post ID'si
        const { header, content } = req.body;
        const user = res.locals.user;
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const post = await postRepository.findOne({
            where: { id: Number(id) },
            relations: ["user"], // Kullanıcı ile birlikte getir
        });
        if (!post) {
            return res.status(404).json({ error: "Post bulunamadı" });
        }
        if (post.user.id !== user.id) {
            return res.status(403).json({ error: "Bu postu güncelleme yetkiniz yok" });
        }
        post.header = header ?? post.header;
        post.content = content ?? post.content;
        if (req.file) {
            post.cover = req.file.buffer;
        }
        await postRepository.save(post);
        res.status(200).json({ message: "Post güncellendi", post });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.putPost = putPost;
const approvePost = async (req, res) => {
    try {
        const { id } = req.params; // URL'den post ID'si
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const post = await postRepository.findOne({
            where: { id: Number(id) },
        });
        if (!post) {
            return res.status(404).json({ error: "Post bulunamadı" });
        }
        if (post.isApproved) {
            return res.status(400).json({ error: "Post zaten onaylanmış" });
        }
        post.isApproved = true;
        await postRepository.save(post);
        res.status(200).json({ message: "Post güncellendi", post });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.approvePost = approvePost;
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const user = res.locals.user;
        const postRepository = database_1.default.getRepository(post_entity_1.default);
        const post = await postRepository.findOne({
            where: { id: Number(id) },
            relations: ["user"],
        });
        if (!post) {
            return res.status(404).json({ error: "Post bulunamadı" });
        }
        if (post.user.id !== user.id) {
            return res.status(403).json({ error: "Bu postu silme yetkiniz yok" });
        }
        await postRepository.remove(post);
        res.status(200).json({ message: "Post silindi" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
exports.deletePost = deletePost;
