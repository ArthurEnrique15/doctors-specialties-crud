import { AddressRepositoryInMemory } from "@modules/doctors/repositories/in-memory/AddressRepositoryInMemory";
import { DoctorRepositoryInMemory } from "@modules/doctors/repositories/in-memory/DoctorRepositoryInMemory";
import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

import { UpdateDoctorUseCase } from "./UpdateDoctorUseCase";

let updateDoctorUseCase: UpdateDoctorUseCase;
let doctorRepositoryInMemory: DoctorRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let addressProvider: AddressProvider;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Update doctor", () => {
    beforeEach(async () => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        addressProvider = new AddressProvider();
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        updateDoctorUseCase = new UpdateDoctorUseCase(
            doctorRepositoryInMemory,
            addressRepositoryInMemory,
            addressProvider,
            specialtyRepositoryInMemory
        );

        await specialtyRepositoryInMemory.create({
            name: "specialty_test_1",
        });

        await specialtyRepositoryInMemory.create({
            name: "specialty_test_2",
        });

        await specialtyRepositoryInMemory.create({
            name: "specialty_test_3",
        });

        await specialtyRepositoryInMemory.create({
            name: "specialty_test_4",
        });
    });

    it("Should be able to update a doctor", async () => {
        const specialty_1 = await specialtyRepositoryInMemory.findByName(
            "specialty_test_1"
        );

        const specialty_2 = await specialtyRepositoryInMemory.findByName(
            "specialty_test_2"
        );

        const address = await addressProvider.getAddress("35930209", 131);

        const { id } = await doctorRepositoryInMemory.create({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address,
            specialties: [specialty_1, specialty_2],
        });

        const updatedDoctor = await updateDoctorUseCase.execute({
            id,
            name: "updated_doctor_test",
            crm: "2",
            landline: "3138520775",
            cellphone: "31938520775",
            cep: "35930201",
            numero: 2,
            specialties_names: ["specialty_test_3", "specialty_test_4"],
        });

        expect(updatedDoctor.updated_at).not.toBe(null);
        expect(updatedDoctor.name).toBe("updated_doctor_test");
        expect(updatedDoctor.crm).toBe("2");
        expect(updatedDoctor.landline).toBe("3138520775");
        expect(updatedDoctor.cellphone).toBe("31938520775");
        expect(updatedDoctor.address.cep).toBe("35930201");
        expect(updatedDoctor.address.numero).toBe(2);
        expect(updatedDoctor.specialties[0].name).toBe("specialty_test_3");
        expect(updatedDoctor.specialties[1].name).toBe("specialty_test_4");
    });

    it("Should not be able to update a doctor without sending information", async () => {
        const specialty_1 = await specialtyRepositoryInMemory.findByName(
            "specialty_test_1"
        );

        const specialty_2 = await specialtyRepositoryInMemory.findByName(
            "specialty_test_2"
        );

        const address = await addressProvider.getAddress("35930209", 131);

        const { id } = await doctorRepositoryInMemory.create({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address,
            specialties: [specialty_1, specialty_2],
        });

        await expect(
            updateDoctorUseCase.execute({
                id,
            })
        ).rejects.toEqual(new AppError("There's no information to update!"));
    });

    it("Should not be able to update a doctor that doesn't exists", async () => {
        await expect(
            updateDoctorUseCase.execute({
                id: "non_existing_id",
                name: "non_existing_name",
            })
        ).rejects.toEqual(new AppError("Doctor doesn't exists!"));
    });

    it("Should not be able to update a doctor sending an existing crm", async () => {
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

        await expect(
            updateDoctorUseCase.execute({
                id,
                crm: "1",
            })
        ).rejects.toEqual(new AppError("Doctor already exists!"));
    });

    it("Should not be able to update a doctor sending 2 or more duplicate specialties", async () => {
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

        await expect(
            updateDoctorUseCase.execute({
                id,
                specialties_names: ["specialty_test_1", "specialty_test_1"],
            })
        ).rejects.toEqual(
            new AppError("Doctor cannot have duplicate specialties!")
        );
    });

    it("Should not be able to update a doctor sending an non existing specialty", async () => {
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

        await expect(
            updateDoctorUseCase.execute({
                id,
                specialties_names: [
                    "non_existing_specialty_1",
                    "non_existing_specialty_2",
                ],
            })
        ).rejects.toEqual(new AppError("Specialty not found!"));
    });
});
