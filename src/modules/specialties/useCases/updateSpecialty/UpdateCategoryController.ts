import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateSpecialtyUseCase } from "./UpdateSpecialtyUseCase";

class UpdateSpecialtyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, description } = request.body;

        const updateSpecialtyUseCase = container.resolve(
            UpdateSpecialtyUseCase
        );

        const updatedSpecialty = await updateSpecialtyUseCase.execute({
            id,
            name,
            description,
        });

        return response.json(updatedSpecialty);
    }
}

export { UpdateSpecialtyController };
