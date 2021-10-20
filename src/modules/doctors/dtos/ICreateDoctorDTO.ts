import { Specialty } from "@modules/specialties/infra/typeorm/entities/Specialty";

import { Address } from "../infra/typeorm/entities/Address";

interface ICreateDoctorDTO {
    name: string;
    crm: string;
    landline: string;
    cellphone: string;
    address: Address;
    specialties: Specialty[];
}

export { ICreateDoctorDTO };
