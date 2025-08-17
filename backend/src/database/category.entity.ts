import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import Post from "~/database/post.entity";

@Entity()
export default class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

    @OneToMany(() => Post, post => post.category)
    posts!: Post[];
}
