import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export default class Announcement {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    name!: string;

}
