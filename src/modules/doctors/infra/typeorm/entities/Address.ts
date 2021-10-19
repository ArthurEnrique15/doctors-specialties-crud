import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
} from "typeorm";

@Entity("address")
class Address {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    cep: string;

    @Column()
    logradouro: string;

    @Column()
    complemento: string;

    @Column()
    numero: number;

    @Column()
    bairro: string;

    @Column()
    localidade: string;

    @Column()
    uf: string;

    @DeleteDateColumn()
    deleted_at?: Date;
}

export { Address };
