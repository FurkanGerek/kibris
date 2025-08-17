import { Router } from "express";
import { getAll, getByID, getByUser, postPost, putPost, deletePost, approvePost } from "~/controllers/post.controller";

import validateMiddleware from "~/middlewares/validate.middleware";
import checkPermission from "~/middlewares/checkPermission.middleware";
import authMiddleware from "~/middlewares/auth.middleware";

import uploadMiddleware from "~/middlewares/upload.middleware";

import { postSchema } from "~/schemas/post.schema"

const router = Router();

router.get("/", getAll)
router.get("/:id", getByID)
router.get("/user/:id", getByUser)

router.post("/", authMiddleware, checkPermission("canCreatePost"), uploadMiddleware.single("photo"), validateMiddleware(postSchema), postPost)
router.put("/:id", authMiddleware, checkPermission("canEditPost"), uploadMiddleware.single("photo"), putPost)
router.delete("/:id", authMiddleware, checkPermission("canDeletePost"), deletePost)
router.post("/approve/:id", authMiddleware, checkPermission("canApprovePost"), approvePost)

export default router