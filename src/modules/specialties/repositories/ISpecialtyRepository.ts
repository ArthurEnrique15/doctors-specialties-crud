// import { ICreateSpecialtyDTO } from "../dtos/ICreateSpecialtyDTO";
// import { IUpdateSpecialtyDTO } from "../dtos/IUpdateSpecialtyDTO";
import { ICreateSpecialtyDTO } from "../dtos/ICreateSpecialtyDTO";
import { IUpdateSpecialtyDTO } from "../dtos/IUpdateSpecialtyDTO";
import { Specialty } from "../infra/typeorm/entities/Specialty";

interface ISpecialtyRepository {
    create({ name }: ICreateSpecialtyDTO): Promise<Specialty>;
    update({ id, name }: IUpdateSpecialtyDTO): Promise<Specialty>;
    softDelete(specialty: Specialty): Promise<Specialty>;
    recover(specialty: Specialty): Promise<Specialty>;
    list(): Promise<Specialty[]>;
    findByName(name: string): Promise<Specialty>;
    findById(id: string): Promise<Specialty>;
    findDeletedById(id: string): Promise<Specialty>;
}

export { ISpecialtyRepository };
