import { getRepository, Repository } from "typeorm";

import { IAddressRepository } from "@modules/doctors/repositories/IAddressRepository";

import { Address } from "../entities/Address";

class AddressRepository implements IAddressRepository {
    private repository: Repository<Address>;

    constructor() {
        this.repository = getRepository(Address);
    }

    async save(address: Address): Promise<Address> {
        const createdAddress = await this.repository.save(address);
        return createdAddress;
    }

    async findById(id: string): Promise<Address> {
        const Address = await this.repository.findOne({ id });
        return Address;
    }
}

export { AddressRepository };
