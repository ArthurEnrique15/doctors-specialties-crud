// import { ICreateSpecialtyDTO } from "../dtos/ICreateSpecialtyDTO";
// import { IUpdateSpecialtyDTO } from "../dtos/IUpdateSpecialtyDTO";
import { Specialty } from "../infra/typeorm/entities/Specialty";

interface ISpecialtyRepository {
    create(name: string): Promise<Specialty>;
    // update({ id, name, description }: IUpdateSpecialtyDTO): Promise<Specialty>;
    // softRemove(specialty: Specialty): Promise<Specialty>;
    // recover(specialty: Specialty): Promise<Specialty>;
    list(): Promise<Specialty[]>;
    findByName(name: string): Promise<Specialty>;
    // findById(id: string): Promise<Specialty>;
    // findDeletedById(id: string): Promise<Specialty>;
    // findByNameDisregardId(id: string, name: string): Promise<Specialty>;
}

export { ISpecialtyRepository };
