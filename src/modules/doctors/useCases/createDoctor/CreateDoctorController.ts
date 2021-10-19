import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateDoctorUseCase } from "./CreateDoctorUseCase";

class CreateDoctorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            crm,
            landline,
            cellphone,
            cep,
            numero,
            specialties_names,
        } = request.body;

        const createDoctorUseCase = container.resolve(CreateDoctorUseCase);

        const createdDoctor = await createDoctorUseCase.execute({
            name,
            crm,
            landline,
            cellphone,
            cep,
            numero,
            specialties_names,
        });

        return response.status(201).json(createdDoctor);
    }
}

export { CreateDoctorController };
