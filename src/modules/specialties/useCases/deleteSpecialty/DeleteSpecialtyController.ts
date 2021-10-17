import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteSpecialtyUseCase } from "./DeleteSpecialtyUseCase";

class DeleteSpecialtyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSpecialtyUseCase = container.resolve(
            DeleteSpecialtyUseCase
        );

        const removedSpecialty = await removeSpecialtyUseCase.execute(id);

        return response.json(removedSpecialty);
    }
}

export { DeleteSpecialtyController };
