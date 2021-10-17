import { inject, injectable } from "tsyringe";

import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
}

@injectable()
class UpdateSpecialtyUseCase {
    constructor(
        @inject("SpecialtyRepository")
        private specialtyRepository: ISpecialtyRepository
    ) {}

    async execute({ id, name }: IRequest): Promise<Specialty> {
        const specialtyExists = await this.specialtyRepository.findById(id);

        if (!specialtyExists) throw new AppError("Specialty doesn't exists!");

        if (!name) throw new AppError("There's no information to update!");

        const specialtyAlreadyExists =
            await this.specialtyRepository.findByName(name);

        if (specialtyAlreadyExists)
            throw new AppError("Specialty already exists!");

        const updatedSpecialty = await this.specialtyRepository.update({
            id,
            name,
        });

        return updatedSpecialty;
    }
}

export { UpdateSpecialtyUseCase };
