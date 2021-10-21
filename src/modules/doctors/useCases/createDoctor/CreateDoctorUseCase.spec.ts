import { AddressRepositoryInMemory } from "@modules/doctors/repositories/in-memory/AddressRepositoryInMemory";
import { DoctorRepositoryInMemory } from "@modules/doctors/repositories/in-memory/DoctorRepositoryInMemory";
import { CreateDoctorUseCase } from "@modules/doctors/useCases/createDoctor/CreateDoctorUseCase";
import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";
import { AppError } from "@shared/errors/AppError";

let createDoctorUseCase: CreateDoctorUseCase;
let doctorRepositoryInMemory: DoctorRepositoryInMemory;
let addressRepositoryInMemory: AddressRepositoryInMemory;
let addressProvider: AddressProvider;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Create doctor", () => {
    beforeEach(async () => {
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        addressRepositoryInMemory = new AddressRepositoryInMemory();
        addressProvider = new AddressProvider();
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();
        createDoctorUseCase = new CreateDoctorUseCase(
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
    });

    it("Should be able to create a new doctor", async () => {
        const doctorCreated = await createDoctorUseCase.execute({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            cep: "35930209",
            numero: 131,
            specialties_names: ["specialty_test_1", "specialty_test_2"],
        });

        expect(doctorCreated).toHaveProperty("id");
    });

    it("Should not be able to create a new doctor with an existing crm", async () => {
        await createDoctorUseCase.execute({
            name: "doctor_test",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            cep: "35930209",
            numero: 131,
            specialties_names: ["specialty_test_1", "specialty_test_2"],
        });

        await expect(
            createDoctorUseCase.execute({
                name: "doctor_test",
                crm: "1",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["specialty_test_1", "specialty_test_2"],
            })
        ).rejects.toEqual(new AppError("Doctor already exists!"));
    });

    it("Should not be able to create a new doctor sending non existing specialties", async () => {
        await expect(
            createDoctorUseCase.execute({
                name: "doctor_test",
                crm: "1",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: [
                    "non_existing_specialty_name_1",
                    "non_existing_specialty_name_2",
                ],
            })
        ).rejects.toEqual(new AppError("Specialty not found!"));
    });

    it("Should not be able to create a new doctor sending 2 or more duplicate specialties", async () => {
        await expect(
            createDoctorUseCase.execute({
                name: "doctor_test",
                crm: "1",
                landline: "3138520776",
                cellphone: "31938520776",
                cep: "35930209",
                numero: 131,
                specialties_names: ["specialty_test_1", "specialty_test_1"],
            })
        ).rejects.toEqual(
            new AppError("Doctor cannot have duplicate specialties!")
        );
    });
});
