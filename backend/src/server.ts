import express, { type Express } from "express";

import dotenv from "dotenv";
import cors from 'cors';

import db, { seedInitialData } from "~/database"

import authRouter from "~/routers/auth.router"
import postRouter from "~/routers/post.router"
import roleRouter from "~/routers/role.router"
import pageRouter from "~/routers/page.router"
import searchRouter from "~/routers/search.router"
import fileRouter from "~/routers/file.router"
import categoryRouter from "~/routers/category.router"
import announcementRouter from "~/routers/announcement.router"

dotenv.config();

db.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")
        await seedInitialData()
    })
    .catch((error) => console.error("Error during Data Source initialization", error));

const app: Express = express();

app.use(express.json());
app.use(
    express.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

app.use(cors({}));

app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/role", roleRouter);
app.use("/page", pageRouter);
app.use("/search", searchRouter);
app.use("/file", fileRouter);
app.use("/category", categoryRouter);
app.use("/announcement", announcementRouter);


app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});