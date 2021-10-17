import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { SpecialtyRepository } from "@modules/specialties/infra/typeorm/repositories/SpecialtyRepository";
import { app } from "@shared/infra/http/app";

let connection: Connection;
let specialtyRepository: SpecialtyRepository;

describe("Recover specialty controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
        specialtyRepository = new SpecialtyRepository();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to recover a specialty", async () => {
        const specialty = await specialtyRepository.create({
            name: "specialty_test",
        });

        specialtyRepository.softDelete(specialty);

        const response = await request(app)
            .put(`/specialties/recover/${specialty.id}`)
            .send();

        expect(response.status).toBe(200);
    });

    it("Should not be able to recover a specialty that doesn't exists", async () => {
        const response = await request(app)
            .put(`/specialties/recover/${uuidV4()}`)
            .send();

        expect(response.status).toBe(400);
    });
});
