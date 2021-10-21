import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create doctor controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new doctor", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "1",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new doctor sending a non string name", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: 1,
                crm: "2",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending an empty name", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "",
                crm: "2",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a name with more than 120 characters", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                crm: "2",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a non string crm", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: 2,
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending an empty crm", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a crm with more than 7 numbers", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "12345678",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a crm with characters that aren't numbers", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "1a",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a invalid landline number", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "313852077",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a invalid cellphone number", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "3138520776",
                cellphone: "313852077",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a cep with less than 8 numbers", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "3138520776",
                cellphone: "313852077",
                cep: "3593020",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a cep with characters that aren't numbers", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "3138520776",
                cellphone: "313852077",
                cep: "3593020a",
                numero: 131,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a numero that is not a number", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "3138520776",
                cellphone: "313852077",
                cep: "35930209",
                numero: "131",
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending a numero that is less than 0", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "3138520776",
                cellphone: "313852077",
                cep: "35930209",
                numero: -10,
                specialties_names: ["Alergologia", "Angiologia"],
            });

        expect(response.status).toBe(400);
    });

    it("Should not be able to create a new doctor sending less that 2 specialties", async () => {
        const response = await request(app)
            .post("/doctors")
            .send({
                name: "doctor_test",
                crm: "2",
                landline: "3138520776",
                cellphone: "313852077",
                cep: "35930209",
                numero: 131,
                specialties_names: ["Alergologia"],
            });

        expect(response.status).toBe(400);
    });
});
