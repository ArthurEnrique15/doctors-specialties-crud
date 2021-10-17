import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListSpecialtiesUseCase } from "./ListSpecialtiesUseCase";

class ListSpecialtiesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecialtiesUseCase = container.resolve(ListSpecialtiesUseCase);

        const allSpecialties = await listSpecialtiesUseCase.execute();

        return response.json(allSpecialties);
    }
}

export { ListSpecialtiesController };
