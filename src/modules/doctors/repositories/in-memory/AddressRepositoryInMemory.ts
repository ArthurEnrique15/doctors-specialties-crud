import { Address } from "@modules/doctors/infra/typeorm/entities/Address";

import { IAddressRepository } from "../IAddressRepository";

class AddressRepositoryInMemory implements IAddressRepository {
    addresses: Address[] = [];

    async save(address: Address): Promise<Address> {
        this.addresses.push(address);

        return address;
    }

    async findById(id: string): Promise<Address> {
        return this.addresses.find((address) => address.id === id);
    }
}

export { AddressRepositoryInMemory };
