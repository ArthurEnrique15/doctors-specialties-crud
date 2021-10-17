// import { v4 as uuidV4 } from "uuid";

// import { ICreateSpecialtyDTO } from "@modules/specialties/dtos/ICreateSpecialtyDTO";
// import { IUpdateSpecialtyDTO } from "@modules/specialties/dtos/IUpdateSpecialtyDTO";
// import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";

// import { ISpecialtyRepository } from "../ISpecialtyRepository";

// class SpecialtyRepositoryInMemory implements ISpecialtyRepository {
//     specialties: Specialty[] = [];

//     async create({
//         name,
//         description,
//     }: ICreateSpecialtyDTO): Promise<Specialty> {
//         const specialty = new Specialty();

//         Object.assign(specialty, { id: uuidV4(), name, description });

//         this.specialties.push(specialty);

//         return specialty;
//     }

//     async update({
//         id,
//         name,
//         description,
//     }: IUpdateSpecialtyDTO): Promise<Specialty> {
//         const specialtyIndex = this.specialties.findIndex(
//             (specialty) => specialty.id === id
//         );

//         if (name) this.specialties[specialtyIndex].name = name;

//         if (description)
//             this.specialties[specialtyIndex].description = description;

//         this.specialties[specialtyIndex].updated_at = new Date();

//         return this.specialties[specialtyIndex];
//     }

//     async softRemove(specialtyRemove: Specialty): Promise<Specialty> {
//         const specialtyIndex = this.specialties.findIndex(
//             (specialty) => specialty.id === specialtyRemove.id
//         );

//         this.specialties[specialtyIndex].updated_at = new Date();
//         this.specialties[specialtyIndex].deleted_at = new Date();

//         return this.specialties[specialtyIndex];
//     }

//     async recover(specialtyRecover: Specialty): Promise<Specialty> {
//         const specialtyIndex = this.specialties.findIndex(
//             (specialty) => specialty.id === specialtyRecover.id
//         );

//         this.specialties[specialtyIndex].updated_at = new Date();
//         this.specialties[specialtyIndex].deleted_at = null;

//         return this.specialties[specialtyIndex];
//     }

//     async list(): Promise<Specialty[]> {
//         return this.specialties;
//     }

//     async findByName(name: string): Promise<Specialty> {
//         return this.specialties.find((specialty) => specialty.name === name);
//     }

//     async findById(id: string): Promise<Specialty> {
//         return this.specialties.find((specialty) => specialty.id === id);
//     }

//     async findDeletedById(id: string): Promise<Specialty> {
//         return this.specialties.find(
//             (specialty) => specialty.id === id && specialty.deleted_at !== null
//         );
//     }

//     findByNameDisregardId(id: string, name: string): Promise<Specialty> {
//         throw new Error("Method not implemented.");
//     }
// }

// export { SpecialtyRepositoryInMemory };
