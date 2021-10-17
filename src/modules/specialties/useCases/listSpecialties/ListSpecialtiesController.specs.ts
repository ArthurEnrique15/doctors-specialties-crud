import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { SpecialtyRepository } from "@modules/specialties/infra/typeorm/repositories/SpecialtyRepository";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let specialtyRepository: SpecialtyRepository;

describe("List specialties controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        specialtyRepository = new SpecialtyRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all specialties", async () => {
        await specialtyRepository.create({
            name: "specialty_test",
            description: "description_test",
        });

        const response = await request(app).get("/specialties").send();

        expect(response.status).toBe(200);
    });
});
