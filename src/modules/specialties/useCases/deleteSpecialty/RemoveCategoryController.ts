import { Response, Request } from "express";
import { container } from "tsyringe";

import { RemoveSpecialtyUseCase } from "./RemoveSpecialtyUseCase";

class RemoveSpecialtyController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeSpecialtyUseCase = container.resolve(
            RemoveSpecialtyUseCase
        );

        const removedSpecialty = await removeSpecialtyUseCase.execute(id);

        return response.json(removedSpecialty);
    }
}

export { RemoveSpecialtyController };
