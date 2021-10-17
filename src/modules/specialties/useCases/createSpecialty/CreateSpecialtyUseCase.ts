import { inject, injectable } from "tsyringe";

import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

interface IResponse {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

@injectable()
class CreateSpecialtyUseCase {
    constructor(
        @inject("SpecialtyRepository")
        private specialtyRepository: ISpecialtyRepository
    ) {}

    async execute(name: string): Promise<IResponse> {
        const specialtyAlreadyExists =
            await this.specialtyRepository.findByName(name);

        if (specialtyAlreadyExists)
            throw new AppError("Specialty already exists!");

        const { id, created_at, updated_at, deleted_at } =
            await this.specialtyRepository.create(name);

        const responseSpecialty: IResponse = {
            id,
            name,
            created_at,
            updated_at,
            deleted_at,
        };

        return responseSpecialty;
    }
}

export { CreateSpecialtyUseCase };
