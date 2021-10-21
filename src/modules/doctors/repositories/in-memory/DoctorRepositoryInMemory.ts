import { v4 as uuidV4 } from "uuid";

import { ICreateDoctorDTO } from "@modules/doctors/dtos/ICreateDoctorDTO";
import { IFilterDoctorsDTO } from "@modules/doctors/dtos/IFilterDoctorsDTO";
import { IUpdateDoctorDTO } from "@modules/doctors/dtos/IUpdateDoctorDTO";
import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";

import { IDoctorRepository } from "../IDoctorRepository";

class DoctorRepositoryInMemory implements IDoctorRepository {
    doctors: Doctor[] = [];

    async create({
        name,
        crm,
        landline,
        cellphone,
        address,
        specialties,
    }: ICreateDoctorDTO): Promise<Doctor> {
        const doctor = new Doctor();

        Object.assign(doctor, {
            id: uuidV4(),
            name,
            crm,
            landline,
            cellphone,
            address,
            specialties,
        });

        this.doctors.push(doctor);

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
        const doctorIndex = this.doctors.findIndex(
            (doctor) => doctor.id === id
        );

        if (name) this.doctors[doctorIndex].name = name;

        if (crm) this.doctors[doctorIndex].crm = crm;

        if (landline) this.doctors[doctorIndex].landline = landline;

        if (cellphone) this.doctors[doctorIndex].cellphone = cellphone;

        if (address) this.doctors[doctorIndex].address = address;

        if (specialties) this.doctors[doctorIndex].specialties = specialties;

        this.doctors[doctorIndex].updated_at = new Date();

        return this.doctors[doctorIndex];
    }

    async softDelete(doctorRemove: Doctor): Promise<Doctor> {
        const doctorIndex = this.doctors.findIndex(
            (doctor) => doctor.id === doctorRemove.id
        );

        this.doctors[doctorIndex].updated_at = new Date();
        this.doctors[doctorIndex].deleted_at = new Date();

        return this.doctors[doctorIndex];
    }

    async recover(doctorRecover: Doctor): Promise<Doctor> {
        const doctorIndex = this.doctors.findIndex(
            (doctor) => doctor.id === doctorRecover.id
        );

        this.doctors[doctorIndex].updated_at = new Date();
        this.doctors[doctorIndex].deleted_at = null;

        return this.doctors[doctorIndex];
    }

    async list(): Promise<Doctor[]> {
        return this.doctors;
    }

    async findByName(name: string): Promise<Doctor> {
        return this.doctors.find((doctor) => doctor.name === name);
    }

    async findById(id: string): Promise<Doctor> {
        return this.doctors.find((doctor) => doctor.id === id);
    }

    async findDeletedById(id: string): Promise<Doctor> {
        return this.doctors.find(
            (doctor) => doctor.id === id && doctor.deleted_at !== null
        );
    }

    async findByCrm(crm: string): Promise<Doctor> {
        return this.doctors.find((doctor) => doctor.crm === crm);
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
        // console.log(this.doctors);
        const doctorsFilter = this.doctors.filter((doctor) => {
            if (
                (name && doctor.name === name) ||
                (crm && doctor.crm === crm) ||
                (landline && doctor.landline === landline) ||
                (cellphone && doctor.cellphone === cellphone) ||
                (cep && doctor.address.cep === cep) ||
                (logradouro && doctor.address.logradouro === logradouro) ||
                (complemento && doctor.address.complemento === complemento) ||
                (numero && doctor.address.numero === numero) ||
                (bairro && doctor.address.bairro === bairro) ||
                (localidade && doctor.address.localidade === localidade) ||
                (uf && doctor.address.uf === uf) ||
                (specialties_names &&
                    this.filterDoctorSpecialties(
                        doctor.specialties,
                        specialties_names
                    ))
            )
                return doctor;
            return null;
        });

        return doctorsFilter;
    }

    filterDoctorSpecialties(
        specialties: Specialty[],
        specialties_names: string[]
    ): boolean {
        const specialtiesFilter = specialties.filter((specialty) =>
            specialties_names.includes(specialty.name)
        );

        if (specialtiesFilter.length > 0) return true;
        return false;
    }
}

export { DoctorRepositoryInMemory };
