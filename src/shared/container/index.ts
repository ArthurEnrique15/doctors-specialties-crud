import { container } from "tsyringe";

import { SpecialtyRepository } from "@modules/specialties/infra/typeorm/repositories/SpecialtyRepository";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";

container.registerSingleton<ISpecialtyRepository>(
    "SpecialtyRepository",
    SpecialtyRepository
);
