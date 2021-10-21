import { DoctorRepositoryInMemory } from "@modules/doctors/repositories/in-memory/DoctorRepositoryInMemory";
import { ListDoctorsUseCase } from "@modules/doctors/useCases/listDoctors/ListDoctorsUseCase";
import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";

let listDoctorsUseCase: ListDoctorsUseCase;
let doctorRepositoryInMemory: DoctorRepositoryInMemory;
let addressProvider: AddressProvider;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("List doctors", () => {
    beforeEach(async () => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        listDoctorsUseCase = new ListDoctorsUseCase(doctorRepositoryInMemory);

        addressProvider = new AddressProvider();
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
    });

    it("Should be able to list all doctors", async () => {
        const specialty_1 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_1",
        });

        const specialty_2 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_2",
        });

        const address = await addressProvider.getAddress("35930209", 131);

        await doctorRepositoryInMemory.create({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address,
            specialties: [specialty_1, specialty_2],
        });

        const doctors = await listDoctorsUseCase.execute();

        expect(doctors.length).toBe(1);
    });
});
