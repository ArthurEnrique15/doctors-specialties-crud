import { inject, injectable } from "tsyringe";

import { IFilterDoctorsDTO } from "@modules/doctors/dtos/IFilterDoctorsDTO";
import { Doctor } from "@modules/doctors/infra/typeorm/entities/Doctor";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";

@injectable()
class FilterDoctorsUseCase {
    constructor(
        @inject("DoctorRepository")
        private doctorRepository: IDoctorRepository
    ) {}

    async execute({
        name,
        crm,
        landline,
        cellphone,
        cep,
        logradouro,
        complemento,
        numero,
        bairro,
        localidade,
        uf,
        specialties_names,
    }: IFilterDoctorsDTO): Promise<Doctor[]> {
        const doctors = await this.doctorRepository.filterDoctors({
            name,
            crm,
            landline,
            cellphone,
            cep,
            logradouro,
            complemento,
            numero,
            bairro,
            localidade,
            uf,
            specialties_names,
        });

        return doctors;
    }
}

export { FilterDoctorsUseCase };
