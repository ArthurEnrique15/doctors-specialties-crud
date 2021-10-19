import { container } from "tsyringe";

import "@shared/container/providers";

import { AddressRepository } from "@modules/doctors/infra/typeorm/repositories/AddressRepository";
import { DoctorRepository } from "@modules/doctors/infra/typeorm/repositories/DoctorRepository";
import { IAddressRepository } from "@modules/doctors/repositories/IAddressRepository";
import { IDoctorRepository } from "@modules/doctors/repositories/IDoctorRepository";
import { SpecialtyRepository } from "@modules/specialties/infra/typeorm/repositories/SpecialtyRepository";
import { ISpecialtyRepository } from "@modules/specialties/repositories/ISpecialtyRepository";

container.registerSingleton<ISpecialtyRepository>(
    "SpecialtyRepository",
    SpecialtyRepository
);

container.registerSingleton<IAddressRepository>(
    "AddressRepository",
    AddressRepository
);

container.registerSingleton<IDoctorRepository>(
    "DoctorRepository",
    DoctorRepository
);
