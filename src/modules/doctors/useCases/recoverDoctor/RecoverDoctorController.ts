import { Response, Request } from "express";
import { container } from "tsyringe";

import { RecoverDoctorUseCase } from "./RecoverDoctorUseCase";

class RecoverDoctorController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const recoverDoctorUseCase = container.resolve(RecoverDoctorUseCase);

        const recoveredDoctor = await recoverDoctorUseCase.execute(id);

        return response.json(recoveredDoctor);
    }
}

export { RecoverDoctorController };
