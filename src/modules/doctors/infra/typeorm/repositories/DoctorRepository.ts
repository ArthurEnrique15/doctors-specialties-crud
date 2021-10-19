import { getRepository, Repository } from "typeorm";

import { ICreateDoctorDTO } from "@modules/doctors/dtos/ICreateDoctorDTO";
// import { IUpdateDoctorDTO } from "@modules/doctors/dtos/IUpdateDoctorDTO";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";

import { Doctor } from "../entities/Doctor";

class DoctorRepository implements IDoctorRepository {
    private repository: Repository<Doctor>;

    constructor() {
        this.repository = getRepository(Doctor);
    }

    async create({
        name,
        crm,
        landline,
        cellphone,
        address,
        specialties,
    }: ICreateDoctorDTO): Promise<Doctor> {
        const doctor = this.repository.create({
            name,
            crm,
            landline,
            cellphone,
            address,
            specialties,
        });
        await this.repository.save(doctor);
        return doctor;
    }

    // async update({ id, name }: IUpdateDoctorDTO): Promise<Doctor> {
    //     const updatedDoctor = await this.repository.save({
    //         id,
    //         name,
    //     });

    //     return updatedDoctor;
    // }

    async softDelete(doctor: Doctor): Promise<Doctor> {
        const removedDoctor = await this.repository.softRemove(doctor);
        return removedDoctor;
    }

    async recover(doctor: Doctor): Promise<Doctor> {
        const recoveredDoctor = await this.repository.recover(doctor);
        return recoveredDoctor;
    }

    async list(): Promise<Doctor[]> {
        const doctors = await this.repository.find();
        return doctors;
    }

    async findByName(name: string): Promise<Doctor> {
        const doctor = await this.repository.findOne({ name });
        return doctor;
    }

    async findById(id: string): Promise<Doctor> {
        const doctor = await this.repository.findOne({ id });
        return doctor;
    }

    async findDeletedById(id: string): Promise<Doctor> {
        const deletedDoctor = await this.repository
            .createQueryBuilder()
            .where("id = :id", { id })
            .andWhere("deleted_at IS NOT NULL")
            .withDeleted()
            .getOne();

        return deletedDoctor;
    }
}

export { DoctorRepository };
