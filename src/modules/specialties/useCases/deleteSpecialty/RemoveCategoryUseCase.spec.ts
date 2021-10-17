import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { RemoveSpecialtyUseCase } from "@modules/specialties/useCases/removeSpecialty/RemoveSpecialtyUseCase";
import { AppError } from "@shared/errors/AppError";

let removeSpecialtyUseCase: RemoveSpecialtyUseCase;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Remove specialty", () => {
    beforeEach(() => {
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        removeSpecialtyUseCase = new RemoveSpecialtyUseCase(
            specialtyRepositoryInMemory
        );
    });

    it("Should be able to remove a specialty", async () => {
        const specialty = await specialtyRepositoryInMemory.create({
            name: "specialty_test",
            description: "description_test",
        });

        const specialtyRemoved = await removeSpecialtyUseCase.execute(
            specialty.id
        );

        expect(specialtyRemoved.deleted_at).not.toBe(null);
    });

    it("Should not be able to remove a specialty that doesn't exists", async () => {
        await expect(
            removeSpecialtyUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Specialty doesn't exists!"));
    });
});
