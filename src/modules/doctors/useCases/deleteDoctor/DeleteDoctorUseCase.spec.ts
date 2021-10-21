import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { DeleteSpecialtyUseCase } from "@modules/specialties/useCases/deleteSpecialty/DeleteSpecialtyUseCase";
import { AppError } from "@shared/errors/AppError";

let removeSpecialtyUseCase: DeleteSpecialtyUseCase;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Delete specialty", () => {
    beforeEach(() => {
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        removeSpecialtyUseCase = new DeleteSpecialtyUseCase(
            specialtyRepositoryInMemory
        );
    });

    it("Should be able to remove a specialty", async () => {
        const specialty = await specialtyRepositoryInMemory.create({
            name: "specialty_test",
        });

        const specialtyDeleted = await removeSpecialtyUseCase.execute(
            specialty.id
        );

        expect(specialtyDeleted.deleted_at).not.toBe(null);
    });

    it("Should not be able to remove a specialty that doesn't exists", async () => {
        await expect(
            removeSpecialtyUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Specialty doesn't exists!"));
    });
});
