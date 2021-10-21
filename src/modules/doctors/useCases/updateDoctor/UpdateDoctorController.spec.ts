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

describe("Update doctor controller", () => {
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
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address: createdAddress,
            specialties: [specialty_1, specialty_2],
        });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to update a doctor", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                name: "updated_doctor_test",
                landline: "3138520775",
                cellphone: "31938520775",
                cep: "35930201",
                numero: 2,
                specialties_names: ["Cirurgia cardíaca", "Angiologia"],
            });

        expect(response.status).toBe(200);
    });

    it("Should not be able to update a doctor sending a non string name", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                name: 1,
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending an empty name", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                name: "",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a name with more than 120 characters", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a non string crm", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                crm: 1,
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending an empty crm", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                crm: "",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a crm with more than 7 numbers", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                crm: "12345678",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a crm with characters that aren't numbers", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                crm: "1a",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a invalid landline number", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                landline: "313852077",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a invalid cellphone number", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                cellphone: "3193852077",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a cep with less than 8 numbers", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                cep: "3593020",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a cep with characters that aren't numbers", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                cep: "3593020a",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a doctor sending a non existing cep", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                cep: "11111111",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a numero that is not a number", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                numero: "1",
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending a numero that is less than 0", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                numero: -1,
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to update a doctor sending less that 2 specialties", async () => {
        const doctor = await doctorRepository.findByCrm("1");

        const response = await request(app)
            .put(`/doctors/update/${doctor.id}`)
            .send({
                specialties_names: ["Alergologia"],
            });

        expect(response.status).toBe(400);
    });
});
