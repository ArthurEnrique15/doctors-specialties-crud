import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { UpdateSpecialtyUseCase } from "./UpdateSpecialtyUseCase";

let updateSpecialtyUseCase: UpdateSpecialtyUseCase;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Update specialty", () => {
    beforeEach(() => {
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        updateSpecialtyUseCase = new UpdateSpecialtyUseCase(
            specialtyRepositoryInMemory
        );
    });

    it("Should be able to update a specialty", async () => {
        const { id } = await specialtyRepositoryInMemory.create({
            name: "specialty_test",
        });

        const updatedSpecialty = await updateSpecialtyUseCase.execute({
            id,
            name: "updated_specialty_test",
        });

        expect(updatedSpecialty.updated_at).not.toBe(null);
        expect(updatedSpecialty.name).toBe("updated_specialty_test");
    });

    it("Should not be able to update a specialty that doesn't exists", async () => {
        await expect(
            updateSpecialtyUseCase.execute({
                id: "non_existing_id",
                name: "non_existing_name",
            })
        ).rejects.toEqual(new AppError("Specialty doesn't exists!"));
    });

    it("Should not be able to update a specialty without sending a name", async () => {
        const specialtyCreated = await specialtyRepositoryInMemory.create({
            name: "specialty_test",
        });

        await expect(
            updateSpecialtyUseCase.execute({
                id: specialtyCreated.id,
                name: undefined,
            })
        ).rejects.toEqual(new AppError("A name must be sent!"));
    });

    it("Should not be able to update a specialty sending an existing name", async () => {
        const specialtyCreated = await specialtyRepositoryInMemory.create({
            name: "specialty_test",
        });

        await expect(
            updateSpecialtyUseCase.execute({
                id: specialtyCreated.id,
                name: specialtyCreated.name,
            })
        ).rejects.toEqual(new AppError("Specialty already exists!"));
    });
});
