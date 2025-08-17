import { Router } from "express";

import { showCover } from "~/controllers/file.controller";

const router = Router();

router.get("/cover/:id", showCover)

export default router