// import request from "supertest";
// import { Connection, createConnection } from "typeorm";
// import { v4 as uuidV4 } from "uuid";

// import { SpecialtyRepository } from "@modules/specialties/infra/typeorm/repositories/SpecialtyRepository";
// import { app } from "@shared/infra/http/app";

// let connection: Connection;
// let specialtyRepository: SpecialtyRepository;

// describe("Update specialty controller", () => {
//     beforeAll(async () => {
//         connection = await createConnection();
//         await connection.runMigrations();
//         specialtyRepository = new SpecialtyRepository();
//     });

//     afterAll(async () => {
//         await connection.dropDatabase();
//         await connection.close();
//     });

//     it("Should be able to update a specialty", async () => {
//         const specialtyCreated = await specialtyRepository.create({
//             name: "specialty_test",
//         });

//         const response = await request(app)
//             .put(`/specialties/update/${specialtyCreated.id}`)
//             .send({
//                 name: "updated_specialty_test",
//                 description: "updated_description_test",
//             });

//         expect(response.status).toBe(200);
//     });

//     it("Should not be able to update a specialty that doesn't exists", async () => {
//         const response = await request(app)
//             .put(`/specialties/update/${uuidV4()}`)
//             .send({
//                 name: "updated_specialty_test",
//                 description: "updated_description_test",
//             });

//         expect(response.status).toBe(400);
//     });

//     it("Should not be able to update a specialty without sending a name", async () => {
//         const specialtyCreated = await specialtyRepository.create({
//             name: "specialty_test",
//         });

//         const response = await request(app)
//             .put(`/specialties/update/${specialtyCreated.id}`)
//             .send({});

//         expect(response.status).toBe(400);
//     });

//     it("Should not be able to update a specialty sending an existing name", async () => {
//         const specialtyCreated = await specialtyRepository.create({
//             name: "specialty_test",
//         });

//         const response = await request(app)
//             .put(`/specialties/update/${specialtyCreated.id}`)
//             .send({
//                 name: specialtyCreated.name,
//             });

//         expect(response.status).toBe(400);
//     });
// });
