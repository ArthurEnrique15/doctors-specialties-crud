import { inject, injectable } from "tsyringe";

import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";

@injectable()
class ListSpecialtiesUseCase {
    constructor(
        @inject("SpecialtyRepository")
        private specialtyRepository: ISpecialtyRepository
    ) {}

    async execute(): Promise<Specialty[]> {
        const specialties = await this.specialtyRepository.list();

        return specialties;
    }
}

export { ListSpecialtiesUseCase };
