import { inject, injectable } from "tsyringe";

import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RecoverSpecialtyUseCase {
    constructor(
        @inject("SpecialtyRepository")
        private specialtyRepository: ISpecialtyRepository
    ) {}

    async execute(id: string): Promise<Specialty> {
        const deletedSpecialty = await this.specialtyRepository.findDeletedById(
            id
        );

        if (!deletedSpecialty) throw new AppError("Specialty wasn't deleted!");

        const recoveredSpecialty = await this.specialtyRepository.recover(
            deletedSpecialty
        );

        return recoveredSpecialty;
    }
}

export { RecoverSpecialtyUseCase };
