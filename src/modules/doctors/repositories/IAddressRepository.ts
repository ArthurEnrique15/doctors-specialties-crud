import { Address } from "../infra/typeorm/entities/Address";

interface IAddressRepository {
    save(address: Address): Promise<Address>;
    findById(id: string): Promise<Address>;
}

export { IAddressRepository };
