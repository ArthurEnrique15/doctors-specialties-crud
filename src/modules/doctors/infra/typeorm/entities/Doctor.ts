import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from "typeorm";

import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";

import { Address } from "./Address";

@Entity("doctor")
class Doctor {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    name: string;

    @Column()
    crm: string;

    @Column()
    landline: string;

    @Column()
    cellphone: string;

    @OneToOne(() => Address, { eager: true })
    @JoinColumn()
    address: Address;

    @ManyToMany(() => Specialty)
    @JoinTable({
        // Nome da tabela do many to many
        name: "doctors_specialties",
        // Nome da coluna que referencia a tabela da entidade (no caso, carro)
        joinColumns: [{ name: "doctor_id" }],
        // Nome da coluna que referencia a outra tabela
        inverseJoinColumns: [{ name: "specialty_id" }],
    })
    specialties: Specialty[];

    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    updated_at?: Date;

    @DeleteDateColumn()
    deleted_at?: Date;
}

export { Doctor };
