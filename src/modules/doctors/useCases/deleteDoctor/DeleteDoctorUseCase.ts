import { inject, injectable } from "tsyringe";

import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class DeleteDoctorUseCase {
    constructor(
        @inject("DoctorRepository")
        private doctorRepository: IDoctorRepository
    ) {}

    async execute(id: string): Promise<Doctor> {
        const doctor = await this.doctorRepository.findById(id);

        if (!doctor) throw new AppError("Doctor doesn't exists!");

        const removedDoctor = await this.doctorRepository.softDelete(doctor);

        return removedDoctor;
    }
}

export { DeleteDoctorUseCase };
