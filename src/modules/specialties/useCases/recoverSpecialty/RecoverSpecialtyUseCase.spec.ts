import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { RecoverSpecialtyUseCase } from "@modules/specialties/useCases/recoverSpecialty/RecoverSpecialtyUseCase";
import { AppError } from "@shared/errors/AppError";

let recoverSpecialtyUseCase: RecoverSpecialtyUseCase;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Recover specialty", () => {
    beforeEach(() => {
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        recoverSpecialtyUseCase = new RecoverSpecialtyUseCase(
            specialtyRepositoryInMemory
        );
    });

    it("Should be able to recover a deleted specialty", async () => {
        const specialty = await specialtyRepositoryInMemory.create({
            name: "specialty_test",
            description: "description_test",
        });

        await specialtyRepositoryInMemory.softRemove(specialty);

        const specialtyRecovered = await recoverSpecialtyUseCase.execute(
            specialty.id
        );

        expect(specialtyRecovered.deleted_at).toBe(null);
    });

    it("Should not be able to recover a specialty that doesn't exists", async () => {
        await expect(
            recoverSpecialtyUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Specialty wasn't deleted!"));
    });
});
