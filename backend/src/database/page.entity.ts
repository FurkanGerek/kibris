import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class Page {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", nullable: false })
    title!: string;

    @Column({ type: "longtext", nullable: false })
    content!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
