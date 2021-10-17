import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";

import { ListSpecialtiesUseCase } from "./ListSpecialtiesUseCase";

let listSpecialtiesUseCase: ListSpecialtiesUseCase;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("List specialties", () => {
    beforeEach(() => {
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        listSpecialtiesUseCase = new ListSpecialtiesUseCase(
            specialtyRepositoryInMemory
        );
    });

    it("Should be able to list all specialties", async () => {
        await specialtyRepositoryInMemory.create({
            name: "specialty_test",
            description: "description_test",
        });

        const specialties = await listSpecialtiesUseCase.execute();

        expect(specialties.length).toBe(1);
    });
});
