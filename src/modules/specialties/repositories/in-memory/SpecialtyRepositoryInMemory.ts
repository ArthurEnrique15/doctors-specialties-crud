import { v4 as uuidV4 } from "uuid";

import { ICreateSpecialtyDTO } from "@modules/specialties/dtos/ICreateSpecialtyDTO";
import { IUpdateSpecialtyDTO } from "@modules/specialties/dtos/IUpdateSpecialtyDTO";
import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";

import { ISpecialtyRepository } from "../ISpecialtyRepository";

class SpecialtyRepositoryInMemory implements ISpecialtyRepository {
    specialties: Specialty[] = [];

    async create({ name }: ICreateSpecialtyDTO): Promise<Specialty> {
        const specialty = new Specialty();

        Object.assign(specialty, { id: uuidV4(), name });

        this.specialties.push(specialty);

        return specialty;
    }

    async update({ id, name }: IUpdateSpecialtyDTO): Promise<Specialty> {
        const specialtyIndex = this.specialties.findIndex(
            (specialty) => specialty.id === id
        );

        this.specialties[specialtyIndex].name = name;

        this.specialties[specialtyIndex].updated_at = new Date();

        return this.specialties[specialtyIndex];
    }

    async softDelete(specialtyRemove: Specialty): Promise<Specialty> {
        const specialtyIndex = this.specialties.findIndex(
            (specialty) => specialty.id === specialtyRemove.id
        );

        this.specialties[specialtyIndex].updated_at = new Date();
        this.specialties[specialtyIndex].deleted_at = new Date();

        return this.specialties[specialtyIndex];
    }

    async recover(specialtyRecover: Specialty): Promise<Specialty> {
        const specialtyIndex = this.specialties.findIndex(
            (specialty) => specialty.id === specialtyRecover.id
        );

        this.specialties[specialtyIndex].updated_at = new Date();
        this.specialties[specialtyIndex].deleted_at = null;

        return this.specialties[specialtyIndex];
    }

    async list(): Promise<Specialty[]> {
        return this.specialties;
    }

    async findByName(name: string): Promise<Specialty> {
        return this.specialties.find((specialty) => specialty.name === name);
    }

    async findByNames(names: string[]): Promise<Specialty[]> {
        return this.specialties.filter((specialty) =>
            names.includes(specialty.name)
        );
    }

    async findById(id: string): Promise<Specialty> {
        return this.specialties.find((specialty) => specialty.id === id);
    }

    async findDeletedById(id: string): Promise<Specialty> {
        return this.specialties.find(
            (specialty) => specialty.id === id && specialty.deleted_at !== null
        );
    }
}

export { SpecialtyRepositoryInMemory };
