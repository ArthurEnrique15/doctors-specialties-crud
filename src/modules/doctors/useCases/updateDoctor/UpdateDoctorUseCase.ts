import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import { IAddressRepository } from "@modules/doctors/repositories/IAddressRepository";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";
import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";
import { IAddressProvider } from "@shared/container/providers/addressProvider/IAddressProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name?: string;
    crm?: string;
    landline?: string;
    cellphone?: string;
    cep?: string;
    numero?: number;
    specialties_names?: string[];
}

@injectable()
class UpdateDoctorUseCase {
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
        id,
        name,
        crm,
        landline,
        cellphone,
        cep,
        numero,
        specialties_names,
    }: IRequest): Promise<Doctor> {
        if (
            !name &&
            !crm &&
            !landline &&
            !cellphone &&
            !cep &&
            !numero &&
            !specialties_names
        )
            throw new AppError("There's no information to update!");

        const doctorExists = await this.doctorRepository.findById(id);

        if (!doctorExists) throw new AppError("Doctor doesn't exists!");

        const doctorAlreadyExists = await this.doctorRepository.findByCrm(crm);

        if (doctorAlreadyExists) throw new AppError("Doctor already exists!");

        let specialties: Specialty[];
        if (specialties_names) {
            const duplicateSpecialties = specialties_names.filter(
                (specialty, i) => specialties_names.indexOf(specialty) !== i
            );

            if (duplicateSpecialties.length > 0)
                throw new AppError("Doctor cannot have duplicate specialties!");

            specialties = await this.specialtyRepository.findByNames(
                specialties_names
            );

            if (specialties.length !== specialties_names.length)
                throw new AppError("Specialty not found!");
        }

        // eslint-disable-next-line no-param-reassign
        if (!cep) cep = doctorExists.address.cep;
        // eslint-disable-next-line no-param-reassign
        if (!numero) numero = doctorExists.address.numero;

        const address = await this.addressProvider.getAddress(cep, numero);

        address.id = doctorExists.address.id;

        const updatedAddress = await this.addressRepository.save(address);

        const updatedDoctor = await this.doctorRepository.update({
            id,
            name,
            crm,
            landline,
            cellphone,
            address: updatedAddress,
            specialties,
        });

        return updatedDoctor;
    }
}

export { UpdateDoctorUseCase };
