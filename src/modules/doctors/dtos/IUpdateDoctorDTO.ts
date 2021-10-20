import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";

import { Address } from "../infra/typeorm/entities/Address";

interface IUpdateDoctorDTO {
    id: string;
    name?: string;
    crm?: string;
    landline?: string;
    cellphone?: string;
    address?: Address;
    specialties?: Specialty[];
}

export { IUpdateDoctorDTO };
