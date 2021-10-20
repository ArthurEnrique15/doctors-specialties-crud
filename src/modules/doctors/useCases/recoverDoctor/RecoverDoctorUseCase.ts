import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class RecoverDoctorUseCase {
    constructor(
        @inject("DoctorRepository")
        private doctorRepository: IDoctorRepository
    ) {}

    async execute(id: string): Promise<Doctor> {
        const deletedDoctor = await this.doctorRepository.findDeletedById(id);

        if (!deletedDoctor) throw new AppError("Doctor wasn't deleted!");

        const recoveredDoctor = await this.doctorRepository.recover(
            deletedDoctor
        );

        return recoveredDoctor;
    }
}

export { RecoverDoctorUseCase };
