import type { Request, Response } from "express";

import db from "~/database";
import Post from "~/database/post.entity";

export const getAll = async (req: Request, res: Response) => {
    try {
        const postRepository = db.getRepository(Post);

        const posts = await postRepository.find({
            relations: ["user", "category"],
            order: { id: "DESC" }
        });

        res.status(200).json({ posts });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" });
    }
}

export const getByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const postRepository = db.getRepository(Post);

        const posts = await postRepository.findOne({
            where: { id: Number(id) },
            relations: ["user"],
            order: { id: "DESC" }
        });

        res.status(200).json({ posts });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" });
    }
}

export const getByUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const postRepository = db.getRepository(Post);

        const posts = await postRepository.find({
            where: { user: { id: Number(id) } },
            relations: ["user"],
            order: { id: "DESC" }
        });

        res.status(200).json({ posts });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" });
    }
}

export const postPost = async (req: Request, res: Response) => {
    try {
        const { header, content, categoryId } = req.body
        const user = res.locals.user

        const postRepository = db.getRepository(Post)

        const post = postRepository.create({
            header,
            content,
            user,
            category: categoryId
        })

        if (req.file) {
            post.cover = req.file.buffer
        }

        await postRepository.save(post)

        res.status(200).json({ post });

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server error" });
    }
}

export const putPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // URL'den post ID'si
        const { header, content } = req.body;
        const user = res.locals.user;

        const postRepository = db.getRepository(Post);

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
            post.cover = req.file.buffer
        }

        await postRepository.save(post);

        res.status(200).json({ message: "Post güncellendi", post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const approvePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // URL'den post ID'si



        const postRepository = db.getRepository(Post);

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};


export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = res.locals.user;

        const postRepository = db.getRepository(Post);

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
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

export const getLastByCategoryName = async (req: Request, res: Response) => {
    try {
        const { name } = req.params;
        const limit = Number(req.query.limit) || 10;

        const postRepository = db.getRepository(Post);

        const posts = await postRepository.find({
            where: { category: { name }, isApproved: true },
            relations: ["user", "category"],
            order: { id: "DESC" },
            take: limit,
        });

        res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
