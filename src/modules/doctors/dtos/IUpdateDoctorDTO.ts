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
/**
 * Nome do médico com no máximo 120 caractéres
 * CRM: somente números com no máximo 7 caracteres
 * Telefone fixo: somente números
 * Telefone celular: somente números
 * CEP: somente números (Ao cadastrar o CEP, deve ser feita uma reqisição via XHR para a API dos correios e retornar todos os dados de endereço do cliente).
 */

export { IUpdateDoctorDTO };
