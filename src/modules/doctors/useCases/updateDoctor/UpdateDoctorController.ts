import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { container } from "tsyringe";

import { UpdateDoctorUseCase } from "./UpdateDoctorUseCase";

class UpdateDoctorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const errors = validationResult(request);

        if (!errors.isEmpty())
            return response.status(400).json({ errors: errors.array() });

        const { id } = request.params;
        const {
            name,
            crm,
            landline,
            cellphone,
            cep,
            numero,
            specialties_names,
        } = request.body;

        const updateDoctorUseCase = container.resolve(UpdateDoctorUseCase);

        const updatedDoctor = await updateDoctorUseCase.execute({
            id,
            name,
            crm,
            landline,
            cellphone,
            cep,
            numero,
            specialties_names,
        });

        return response.json(updatedDoctor);
    }
}

export { UpdateDoctorController };
