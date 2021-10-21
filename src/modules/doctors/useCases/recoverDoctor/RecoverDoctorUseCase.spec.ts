import { DoctorRepositoryInMemory } from "@modules/doctors/repositories/in-memory/DoctorRepositoryInMemory";
import { RecoverDoctorUseCase } from "@modules/doctors/useCases/recoverDoctor/RecoverDoctorUseCase";
import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

let recoverDoctorUseCase: RecoverDoctorUseCase;
let doctorRepositoryInMemory: DoctorRepositoryInMemory;
let addressProvider: AddressProvider;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Recover doctor", () => {
    beforeEach(() => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        recoverDoctorUseCase = new RecoverDoctorUseCase(
            doctorRepositoryInMemory
        );

        addressProvider = new AddressProvider();
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
    });

    it("Should be able to recover a deleted doctor", async () => {
        const specialty_1 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_1",
        });

        const specialty_2 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_2",
        });

        const address = await addressProvider.getAddress("35930209", 131);

        const doctor = await doctorRepositoryInMemory.create({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address,
            specialties: [specialty_1, specialty_2],
        });

        await doctorRepositoryInMemory.softDelete(doctor);

        const doctorRecovered = await recoverDoctorUseCase.execute(doctor.id);

        expect(doctorRecovered.deleted_at).toBe(null);
    });

    it("Should not be able to recover a doctor that doesn't exists", async () => {
        await expect(
            recoverDoctorUseCase.execute("non_existing_id")
        ).rejects.toEqual(new AppError("Doctor wasn't deleted!"));
    });
});
