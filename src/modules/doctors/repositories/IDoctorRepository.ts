import { ICreateDoctorDTO } from "../dtos/ICreateDoctorDTO";
import { IFilterDoctorsDTO } from "../dtos/IFilterDoctorsDTO";
import { IUpdateDoctorDTO } from "../dtos/IUpdateDoctorDTO";
import { Doctor } from "../infra/typeorm/entities/Doctor";

interface IDoctorRepository {
    create({
        name,
        crm,
        landline,
        cellphone,
        address,
        specialties,
    }: ICreateDoctorDTO): Promise<Doctor>;
    update({
        id,
        name,
        crm,
        landline,
        cellphone,
        address,
        specialties,
    }: IUpdateDoctorDTO): Promise<Doctor>;
    softDelete(specialty: Doctor): Promise<Doctor>;
    recover(specialty: Doctor): Promise<Doctor>;
    list(): Promise<Doctor[]>;
    findByName(name: string): Promise<Doctor>;
    findById(id: string): Promise<Doctor>;
    findDeletedById(id: string): Promise<Doctor>;
    findByCrm(crm: string): Promise<Doctor>;
    filterDoctors({
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
    }: IFilterDoctorsDTO): Promise<Doctor[]>;
}

export { IDoctorRepository };
