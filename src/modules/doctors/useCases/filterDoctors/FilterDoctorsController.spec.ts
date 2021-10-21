import request from "supertest";
import { Connection, createConnection } from "typeorm";

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

describe("Filter doctors controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        doctorRepository = new DoctorRepository();
        addressProvider = new AddressProvider();
        addressRepository = new AddressRepository();
        specialtyRepository = new SpecialtyRepository();

        const specialty_1 = await specialtyRepository.findByName("Alergologia");
        const specialty_2 = await specialtyRepository.findByName("Angiologia");

        const address = await addressProvider.getAddress("35930209", 131);
        const createdAddress = await addressRepository.save(address);

        await doctorRepository.create({
            name: "doctor_test_1",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address: createdAddress,
            specialties: [specialty_1, specialty_2],
        });

        await doctorRepository.create({
            name: "doctor_test_2",
            crm: "2",
            landline: "3138520777",
            cellphone: "31938520777",
            address: createdAddress,
            specialties: [specialty_1, specialty_2],
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to filter doctors", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            name: "doctor_test_1",
        });

        expect(response.status).toBe(200);
    });

    it("Should not be able to filter doctors sending a non string name", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            name: 1,
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending an empty name", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            name: "",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a name with more than 120 characters", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a non string crm", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            crm: 1,
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending an empty crm", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            crm: "",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a crm with more than 7 numbers", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            crm: "12345678",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a crm with characters that aren't numbers", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            crm: "123456a",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a invalid landline number", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            landline: "1",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a invalid cellphone number", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            cellphone: "1",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a cep with less than 8 numbers", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            cep: "3593020",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to filter doctors sending a cep with characters that aren't numbers", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            cep: "3593020a",
        });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a doctor sending a non existing cep", async () => {
        const response = await request(app).get("/doctors/filter/").send({
            cep: "11111111",
        });

        expect(response.status).toBe(400);
    });
});
