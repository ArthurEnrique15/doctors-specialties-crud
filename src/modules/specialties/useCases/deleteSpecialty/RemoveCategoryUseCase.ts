import { inject, injectable } from "tsyringe";

import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RemoveSpecialtyUseCase {
    constructor(
        @inject("SpecialtyRepository")
        private specialtyRepository: ISpecialtyRepository
    ) {}

    async execute(id: string): Promise<Specialty> {
        const specialty = await this.specialtyRepository.findById(id);

        if (!specialty) throw new AppError("Specialty doesn't exists!");

        const removedSpecialty = await this.specialtyRepository.softRemove(
            specialty
        );

        return removedSpecialty;
    }
}

export { RemoveSpecialtyUseCase };
