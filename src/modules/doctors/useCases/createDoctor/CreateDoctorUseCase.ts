import { inject, injectable } from "tsyringe";

import { Address } from "@modules/doctors/infra/typeorm/entities/Address";
import { IAddressRepository } from "@modules/doctors/repositories/IAddressRepository";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";
import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";
import { IAddressProvider } from "@shared/container/providers/addressProvider/IAddressProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    crm: string;
    landline: string;
    cellphone: string;
    cep: string;
    numero: number;
    specialties_names: string[];
}

interface IResponse {
    id: string;
    name: string;
    crm: string;
    landline: string;
    cellphone: string;
    address: Address;
    specialties: Specialty[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

@injectable()
class CreateDoctorUseCase {
    constructor(
        @inject("DoctorRepository")
        private doctorRepository: IDoctorRepository,
        @inject("AddressRepository")
        private addressRepository: IAddressRepository,
        @inject("AddressProvider")
        private addressProvider: IAddressProvider,
        @inject("SpecialtyRepository")
        private specialtyRepository: ISpecialtyRepository
    ) {}

    async execute({
        name,
        crm,
        landline,
        cellphone,
        cep,
        numero,
        specialties_names,
    }: IRequest): Promise<IResponse> {
        // if (name.length > 120)
        //     throw new AppError("Name must have a maximum of 120 characters!");

        // // verifica se a string tem apenas números
        // const regex = new RegExp("^[0-9]+$");

        // if (!regex.test(crm) || crm.length > 7)
        //     throw new AppError("Invalid CRM!");

        // if (!regex.test(landline) || landline.length !== 10)
        //     throw new AppError("Invalid telefone fixo!");

        // if (
        //     !regex.test(cellphone) ||
        //     cellphone.length !== 11 ||
        //     cellphone[2] !== "9"
        // )
        //     throw new AppError("Invalid telefone celular!");

        // if (specialties_names.length < 2)
        //     throw new AppError("Doctor must have at least 2 specialties!");

        const doctorAlreadyExists = await this.doctorRepository.findByCrm(crm);

        if (doctorAlreadyExists) throw new AppError("Doctor already exists!");

        const specialties = await this.specialtyRepository.findByNames(
            specialties_names
        );

        if (specialties.length !== specialties_names.length)
            throw new AppError("Specialty not found!");

        const address = await this.addressProvider.getAddress(cep, numero);

        const createdAddress = await this.addressRepository.save(address);

        const { id, created_at, updated_at, deleted_at } =
            await this.doctorRepository.create({
                name,
                crm,
                landline,
                cellphone,
                address: createdAddress,
                specialties,
            });

        const responseDoctor: IResponse = {
            id,
            name,
            crm,
            landline,
            cellphone,
            address: createdAddress,
            specialties,
            created_at,
            updated_at,
            deleted_at,
        };

        return responseDoctor;
    }
}

export { CreateDoctorUseCase };
