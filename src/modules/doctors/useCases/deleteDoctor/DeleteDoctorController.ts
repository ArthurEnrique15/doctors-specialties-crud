import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteDoctorUseCase } from "./DeleteDoctorUseCase";

class DeleteDoctorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeDoctorUseCase = container.resolve(DeleteDoctorUseCase);

        const removedDoctor = await removeDoctorUseCase.execute(id);

        return response.json(removedDoctor);
    }
}

export { DeleteDoctorController };
