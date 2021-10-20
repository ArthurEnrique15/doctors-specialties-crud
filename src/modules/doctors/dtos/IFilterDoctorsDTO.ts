interface IFilterDoctorsDTO {
    name?: string;
    crm?: string;
    landline?: string;
    cellphone?: string;
    cep?: string;
    logradouro?: string;
    complemento?: string;
    numero?: number;
    bairro?: string;
    localidade?: string;
    uf?: string;
    specialties_names?: string[];
}

export { IFilterDoctorsDTO };
