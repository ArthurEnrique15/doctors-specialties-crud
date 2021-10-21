import { DoctorRepositoryInMemory } from "@modules/doctors/repositories/in-memory/DoctorRepositoryInMemory";
import { DeleteDoctorUseCase } from "@modules/doctors/useCases/deleteDoctor/DeleteDoctorUseCase";
import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

let removeDoctorUseCase: DeleteDoctorUseCase;
let doctorRepositoryInMemory: DoctorRepositoryInMemory;
let addressProvider: AddressProvider;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Delete doctor", () => {
    beforeEach(() => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        removeDoctorUseCase = new DeleteDoctorUseCase(doctorRepositoryInMemory);

        addressProvider = new AddressProvider();
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
    });

    it("Should be able to remove a doctor", async () => {
        const specialty_1 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_1",
        });

        const specialty_2 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_2",
        });

        const address = await addressProvider.getAddress("35930209", 131);

        const { id } = await doctorRepositoryInMemory.create({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address,
            specialties: [specialty_1, specialty_2],
        });

        const doctorDeleted = await removeDoctorUseCase.execute(id);

        expect(doctorDeleted.deleted_at).not.toBe(null);
    });

    it("Should not be able to remove a doctor that doesn't exists", async () => {
        await expect(
            removeDoctorUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Doctor doesn't exists!"));
    });
});
