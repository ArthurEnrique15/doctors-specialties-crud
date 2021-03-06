import { getRepository, In, Repository } from "typeorm";

import { ICreateSpecialtyDTO } from "@modules/specialties/dtos/ICreateSpecialtyDTO";
import { IUpdateSpecialtyDTO } from "@modules/specialties/dtos/IUpdateSpecialtyDTO";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";

import { Specialty } from "../entities/Specialty";

class SpecialtyRepository implements ISpecialtyRepository {
    private repository: Repository<Specialty>;

    constructor() {
        this.repository = getRepository(Specialty);
    }

    async create({ name }: ICreateSpecialtyDTO): Promise<Specialty> {
        const specialty = this.repository.create({ name });
        await this.repository.save(specialty);
        return specialty;
    }

    async update({ id, name }: IUpdateSpecialtyDTO): Promise<Specialty> {
        const updatedSpecialty = await this.repository.save({
            id,
            name,
        });

        return updatedSpecialty;
    }

    async softDelete(specialty: Specialty): Promise<Specialty> {
        const removedSpecialty = await this.repository.softRemove(specialty);
        return removedSpecialty;
    }

    async recover(specialty: Specialty): Promise<Specialty> {
        const recoveredSpecialty = await this.repository.recover(specialty);
        return recoveredSpecialty;
    }

    async list(): Promise<Specialty[]> {
        const specialties = await this.repository.find();
        return specialties;
    }

    async findByName(name: string): Promise<Specialty> {
        const specialty = await this.repository.findOne({ name });
        return specialty;
    }

    async findByNames(names: string[]): Promise<Specialty[]> {
        const specialties = await this.repository.find({
            where: { name: In(names) },
        });

        return specialties;
    }

    async findById(id: string): Promise<Specialty> {
        const specialty = await this.repository.findOne({ id });
        return specialty;
    }

    async findDeletedById(id: string): Promise<Specialty> {
        const deletedSpecialty = await this.repository
            .createQueryBuilder()
            .where("id = :id", { id })
            .andWhere("deleted_at IS NOT NULL")
            .withDeleted()
            .getOne();

        return deletedSpecialty;
    }
}

export { SpecialtyRepository };
