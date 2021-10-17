import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateSpecialtyUseCase } from "./UpdateSpecialtyUseCase";

class UpdateSpecialtyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name } = request.body;

        const updateSpecialtyUseCase = container.resolve(
            UpdateSpecialtyUseCase
        );

        const updatedSpecialty = await updateSpecialtyUseCase.execute({
            id,
            name,
        });

        return response.json(updatedSpecialty);
    }
}

export { UpdateSpecialtyController };
