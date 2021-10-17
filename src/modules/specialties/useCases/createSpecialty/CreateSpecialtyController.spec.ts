import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "@shared/infra/http/app";

let connection: Connection;

describe("Create specialty controller", () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new specialty", async () => {
        const response = await request(app).post("/specialties").send({
            name: "specialty_test",
            description: "description_test",
        });

        expect(response.status).toBe(201);
    });

    it("Should not be able to create a new specialty with an existing name", async () => {
        const response = await request(app).post("/specialties").send({
            name: "specialty_test",
            description: "description_test",
        });

        expect(response.status).toBe(400);
    });
});
