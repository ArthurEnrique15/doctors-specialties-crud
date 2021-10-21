import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { AddressRepository } from "@modules/doctors/infra/typeorm/repositories/AddressRepository";
import { DoctorRepository } from "@modules/doctors/infra/typeorm/repositories/DoctorRepository";
import { SpecialtyRepository } from "@modules/specialties/infra/typeorm/repositories/SpecialtyRepository";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let doctorRepository: DoctorRepository;
let addressRepository: AddressRepository;
let addressProvider: AddressProvider;
let specialtyRepository: SpecialtyRepository;

describe("Recover doctor controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        doctorRepository = new DoctorRepository();
        addressProvider = new AddressProvider();
        addressRepository = new AddressRepository();
        specialtyRepository = new SpecialtyRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to recover a doctor", async () => {
        const specialty_1 = await specialtyRepository.findByName("Alergologia");
        const specialty_2 = await specialtyRepository.findByName("Angiologia");

        const address = await addressProvider.getAddress("35930209", 131);

        const createdAddress = await addressRepository.save(address);

        const doctor = await doctorRepository.create({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address: createdAddress,
            specialties: [specialty_1, specialty_2],
        });

        doctorRepository.softDelete(doctor);

        const response = await request(app)
            .put(`/doctors/recover/${doctor.id}`)
            .send();

        expect(response.status).toBe(200);
    });

    it("Should not be able to recover a doctor that doesn't exists", async () => {
        const response = await request(app)
            .put(`/doctors/recover/${uuidV4()}`)
            .send();

        expect(response.status).toBe(400);
    });
});
