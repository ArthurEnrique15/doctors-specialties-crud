import { DoctorRepositoryInMemory } from "@modules/doctors/repositories/in-memory/DoctorRepositoryInMemory";
import { SpecialtyRepositoryInMemory } from "@modules/specialties/repositories/in-memory/SpecialtyRepositoryInMemory";
import { AddressProvider } from "@shared/container/providers/addressProvider/implementations/AddressProvider";

import { FilterDoctorsUseCase } from "./FilterDoctorsUseCase";

let filterDoctorsUseCase: FilterDoctorsUseCase;
let doctorRepositoryInMemory: DoctorRepositoryInMemory;
let addressProvider: AddressProvider;
let specialtyRepositoryInMemory: SpecialtyRepositoryInMemory;

describe("Filter doctors", () => {
    beforeEach(async () => {
        jest.setTimeout(60000);
        doctorRepositoryInMemory = new DoctorRepositoryInMemory();
        filterDoctorsUseCase = new FilterDoctorsUseCase(
            doctorRepositoryInMemory
        );

        addressProvider = new AddressProvider();
        specialtyRepositoryInMemory = new SpecialtyRepositoryInMemory();

        const specialty_1 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_1",
        });

        const specialty_2 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_2",
        });

        const specialty_3 = await specialtyRepositoryInMemory.create({
            name: "specialty_test_3",
        });

        const address_1 = await addressProvider.getAddress("35930209", 131);

        const address_2 = await addressProvider.getAddress("30112002", 2);

        await doctorRepositoryInMemory.create({
            name: "doctor_test_1",
            crm: "1",
            landline: "3138520776",
            cellphone: "31938520776",
            address: address_1,
            specialties: [specialty_1, specialty_2],
        });

        await doctorRepositoryInMemory.create({
            name: "doctor_test_2",
            crm: "2",
            landline: "3138520777",
            cellphone: "31938520777",
            address: address_2,
            specialties: [specialty_2, specialty_3],
        });
    });

    it("Should be able to filter doctors by name", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            name: "doctor_test_1",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by crm", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            crm: "1",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by landline", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            landline: "3138520776",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by cellphone", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            cellphone: "31938520776",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by cep", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            cep: "35930209",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by logradouro", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            logradouro: "Rua Campinas",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by complemento", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            complemento: "de 301 a 719 - lado ímpar",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by numero", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            numero: 131,
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by bairro", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            bairro: "José Elói",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by localidade", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            localidade: "João Monlevade",
        });

        expect(doctors.length).toBe(1);
    });

    it("Should be able to filter doctors by uf", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            uf: "MG",
        });

        expect(doctors.length).toBe(2);
    });

    it("Should be able to filter doctors by specialties", async () => {
        const doctors = await filterDoctorsUseCase.execute({
            specialties_names: ["specialty_test_1"],
        });

        expect(doctors.length).toBe(1);
    });
});
