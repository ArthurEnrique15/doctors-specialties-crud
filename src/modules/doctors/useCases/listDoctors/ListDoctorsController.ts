import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListDoctorsUseCase } from "./ListDoctorsUseCase";

class ListDoctorsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listDoctorsUseCase = container.resolve(ListDoctorsUseCase);

        const doctors = await listDoctorsUseCase.execute();

        return response.json(doctors);
    }
}

export { ListDoctorsController };
