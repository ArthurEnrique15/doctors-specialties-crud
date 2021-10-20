import { ICreateDoctorDTO } from "../dtos/ICreateDoctorDTO";
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
}

export { IDoctorRepository };
