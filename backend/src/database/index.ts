import * as dotenv from "dotenv";
import { DataSource } from "typeorm";

import User from "~/database/user.entity"
import Token from "~/database/token.entity"
import Post from "~/database/post.entity"
import Role from "~/database/role.entity"
import Category from "~/database/category.entity";
import Page from "~/database/page.entity";
import Announcement from "~/database/announcement.entity";

import bcrypt from "bcrypt"

dotenv.config();

const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER!,
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE!,
    synchronize: true,
    logging: false,
    entities: [User, Token, Post, Role, Category, Page, Announcement],
});

export async function seedInitialData() {
    const roleRepo = AppDataSource.getRepository(Role);
    const userRepo = AppDataSource.getRepository(User);
    const categoryRepo = AppDataSource.getRepository(Category);

    const roles = [
        { name: "superadmin", canCreatePost: true, canEditPost: true, canDeletePost: true, canApprovePost: true, canManagePages: true, canManageRoles: false },
        { name: "admin", canCreatePost: true, canEditPost: true, canDeletePost: true, canApprovePost: true, canManagePages: false, canManageRoles: false },
        { name: "author", canCreatePost: true, canEditPost: true, canDeletePost: false, canApprovePost: false, canManagePages: false, canManageRoles: false },
        { name: "user", canCreatePost: false, canEditPost: false, canDeletePost: false, canApprovePost: false, canManagePages: false, canManageRoles: false },
    ];

    for (const r of roles) {
        const exists = await roleRepo.findOneBy({ name: r.name });
        if (!exists) {
            const role = roleRepo.create(r);
            await roleRepo.save(role);
        }
    }

    const categories = [
        { name: "Genel" },
        { name: "Makale" },
        { name: "Haber" },
        { name: "Kitap" },
    ];

    for (const c of categories) {
        const exists = await categoryRepo.findOneBy({ name: c.name });
        if (!exists) {
            const category = categoryRepo.create(c);
            await categoryRepo.save(category);
        }
    }

    const adminName = process.env.ADMIN_NAME;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    const exists = await userRepo.findOneBy({ name: adminName, email: adminEmail });
    if (!exists) {
        const admin = new User();
        admin.name = adminName!;
        admin.email = adminEmail!;
        admin.password = await bcrypt.hash(adminPassword!, 10);
        admin.roleId = 1;
        await userRepo.save(admin);
    }
}



export default AppDataSource;
