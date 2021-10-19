import { consultarCep } from "correios-brasil/dist";

import { Address } from "@modules/doctors/infra/typeorm/entities/Address";

import { IAddressProvider } from "../IAddressProvider";

class AddressProvider implements IAddressProvider {
    async getAddress(cep: string, numero: number): Promise<Address> {
        const cepData = await consultarCep(cep);

        if (cepData) {
            const { logradouro, complemento, bairro, localidade, uf } = cepData;

            const address: Address = {
                cep,
                logradouro,
                complemento,
                bairro,
                localidade,
                uf,
                numero,
            };

            return address;
        }

        return null;
    }
}

export { AddressProvider };
