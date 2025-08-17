import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import User from "~/database/user.entity"
import Category from "~/database/category.entity"

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar" })
    header!: string;

    @Column({ type: "longblob", nullable: true, select: false })
    cover!: Buffer

    @Column({ type: "longtext", nullable: false })
    content!: string;

    @Column({ default: false })
    isApproved!: boolean;

    @ManyToOne(() => User, user => user.posts, { onDelete: "CASCADE", nullable: false })
    user!: User;

    @ManyToOne(() => Category, category => category.posts)
    category!: Category;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
