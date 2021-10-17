import { Response, Request } from "express";
import { container } from "tsyringe";

import { RecoverSpecialtyUseCase } from "./RecoverSpecialtyUseCase";

class RecoverSpecialtyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const recoverSpecialtyUseCase = container.resolve(
            RecoverSpecialtyUseCase
        );

        const recoveredSpecialty = await recoverSpecialtyUseCase.execute(id);

        return response.json(recoveredSpecialty);
    }
}

export { RecoverSpecialtyController };
