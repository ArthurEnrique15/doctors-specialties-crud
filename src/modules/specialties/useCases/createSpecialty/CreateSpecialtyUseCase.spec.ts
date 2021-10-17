import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { CreateSpecialtyUseCase } from "@modules/specialties/useCases/createSpecialty/CreateSpecialtyUseCase";
import { AppError } from "@shared/errors/AppError";

let createSpecialtyUseCase: CreateSpecialtyUseCase;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Create specialty", () => {
    beforeEach(() => {
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        createSpecialtyUseCase = new CreateSpecialtyUseCase(
            specialtyRepositoryInMemory
        );
    });

    it("Should be able to create a new specialty", async () => {
        const specialtyCreated = await createSpecialtyUseCase.execute({
            name: "specialty_test",
        });

        expect(specialtyCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new specialty with an existing name", async () => {
        await createSpecialtyUseCase.execute({
            name: "specialty_test",
        });

        await expect(
            createSpecialtyUseCase.execute({
                name: "specialty_test",
            })
        ).rejects.toEqual(new AppError("Specialty already exists!"));
    });
});
