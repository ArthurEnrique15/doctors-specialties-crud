import { getRepository, Repository } from "typeorm";

import { ICreateDoctorDTO } from "@modules/doctors/dtos/ICreateDoctorDTO";
import { IFilterDoctorsDTO } from "@modules/doctors/dtos/IFilterDoctorsDTO";
import { IUpdateDoctorDTO } from "@modules/doctors/dtos/IUpdateDoctorDTO";
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

    async update({
        id,
        name,
        crm,
        landline,
        cellphone,
        address,
        specialties,
    }: IUpdateDoctorDTO): Promise<Doctor> {
        const updatedDoctor = await this.repository.save({
            id,
            name,
            crm,
            landline,
            cellphone,
            address,
            specialties,
        });

        return updatedDoctor;
    }

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

    async findByCrm(crm: string): Promise<Doctor> {
        const doctor = await this.repository.findOne({ crm });
        return doctor;
    }

    async filterDoctors({
        name,
        crm,
        landline,
        cellphone,
        cep,
        logradouro,
        complemento,
        numero,
        bairro,
        localidade,
        uf,
        specialties_names,
    }: IFilterDoctorsDTO): Promise<Doctor[]> {
        const filterDoctorsQuery = this.repository.createQueryBuilder("doctor");

        if (name) filterDoctorsQuery.andWhere("doctor.name = :name", { name });

        if (crm) filterDoctorsQuery.andWhere("doctor.crm = :crm", { crm });

        if (landline)
            filterDoctorsQuery.andWhere("doctor.landline = :landline", {
                landline,
            });

        if (cellphone)
            filterDoctorsQuery.andWhere("doctor.cellphone = :cellphone", {
                cellphone,
            });

        filterDoctorsQuery.leftJoinAndSelect("doctor.address", "address");

        if (cep) filterDoctorsQuery.andWhere("address.cep = :cep", { cep });

        if (logradouro)
            filterDoctorsQuery.andWhere("address.logradouro = :logradouro", {
                logradouro,
            });

        if (complemento)
            filterDoctorsQuery.andWhere("address.complemento = :complemento", {
                complemento,
            });

        if (numero)
            filterDoctorsQuery.andWhere("address.numero = :numero", { numero });

        if (bairro)
            filterDoctorsQuery.andWhere("address.bairro = :bairro", { bairro });

        if (localidade)
            filterDoctorsQuery.andWhere("address.localidade = :localidade", {
                localidade,
            });

        if (uf) filterDoctorsQuery.andWhere("address.uf = :uf", { uf });

        filterDoctorsQuery.leftJoinAndSelect("doctor.specialties", "specialty");

        if (specialties_names) {
            specialties_names.forEach((specialty_name) => {
                filterDoctorsQuery.andWhere(
                    "specialty.name = :specialty_name",
                    { specialty_name }
                );
            });
        }

        const doctors = await filterDoctorsQuery.getMany();

        return doctors;
    }
}

export { DoctorRepository };
