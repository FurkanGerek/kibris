import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import User from "~/database/user.entity";

@Entity()
export default class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => User, user => user.role)
    users!: User[];

    @Column({ default: false })
    canCreatePost!: boolean;

    @Column({ default: false })
    canEditPost!: boolean;

    @Column({ default: false })
    canDeletePost!: boolean;

    @Column({ default: false })
    canApprovePost!: boolean;

    @Column({ default: false })
    canManageRoles!: boolean;

    @Column({ default: false })
    canManagePages!: boolean;

    @Column({ default: false })
    canManageCategories!: boolean;

    @Column({ default: false })
    canManageAnnouncements!: boolean;
}
