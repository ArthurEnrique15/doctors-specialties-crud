import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { IFilterDoctorsDTO } from "@modules/doctors/dtos/IFilterDoctorsDTO";

import { FilterDoctorsUseCase } from "./FilterDoctorsUseCase";

class FilterDoctorsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const errors = validationResult(request);

        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });

        const {
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
        }: IFilterDoctorsDTO = request.query;
        const listDoctorsUseCase = container.resolve(FilterDoctorsUseCase);

        const doctors = await listDoctorsUseCase.execute({
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

        return response.json(doctors);
    }
}

export { FilterDoctorsController };
