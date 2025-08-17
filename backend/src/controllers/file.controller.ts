import type { Request, Response } from "express";
import db from "~/database";
import Post from "~/database/post.entity";

export const showCover = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const postRepository = db.getRepository(Post);

        const post = await postRepository.findOne({
            where: { id: Number(id) },
            select: ["cover"],
            order: { id: "DESC" }
        });

        res.setHeader("Content-Type", "image/jpeg");
        res.end(post?.cover);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};
