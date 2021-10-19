import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";

@injectable()
class ListDoctorsUseCase {
    constructor(
        @inject("DoctorRepository")
        private doctorRepository: IDoctorRepository
    ) {}

    async execute(): Promise<Doctor[]> {
        const doctors = await this.doctorRepository.list();

        return doctors;
    }
}

export { ListDoctorsUseCase };
