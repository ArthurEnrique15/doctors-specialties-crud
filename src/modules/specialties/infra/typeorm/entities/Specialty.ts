import {
    PrimaryGeneratedColumn,
    Entity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("specialty")
class Specialty {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

export { Specialty };
