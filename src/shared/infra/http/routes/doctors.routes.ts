import { Router } from "express";
import { check } from "express-validator";

import { CreateDoctorController } from "@modules/doctors/useCases/createDoctor/CreateDoctorController";
import { DeleteDoctorController } from "@modules/doctors/useCases/deleteDoctor/DeleteDoctorController";
import { FilterDoctorsController } from "@modules/doctors/useCases/filterDoctors/FilterDoctorsController";
import { ListDoctorsController } from "@modules/doctors/useCases/listDoctors/ListDoctorsController";
import { RecoverDoctorController } from "@modules/doctors/useCases/recoverDoctor/RecoverDoctorController";
import { UpdateDoctorController } from "@modules/doctors/useCases/updateDoctor/UpdateDoctorController";

const doctorsRoutes = Router();

const createDoctorController = new CreateDoctorController();
const listDoctorsController = new ListDoctorsController();
const updateDoctorController = new UpdateDoctorController();
const deleteDoctorController = new DeleteDoctorController();
const recoverDoctorController = new RecoverDoctorController();
const filterDoctorsController = new FilterDoctorsController();

const doctorNameChain = check("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 0, max: 120 })
    .withMessage("Name must have a maximum of 120 characters");

const doctorCrmChain = check("crm")
    .isString()
    .withMessage("CRM must be a string")
    .notEmpty()
    .withMessage("CRM cannot be empty")
    .isLength({ min: 0, max: 7 })
    .withMessage("CRM must have a maximum of 7 numbers")
    .custom((crm) => RegExp("^[0-9]+$").test(crm) === true)
    .withMessage("CRM must have only numbers");

const doctorLandlineChain = check("landline")
    .isMobilePhone("pt-BR")
    .withMessage("Invalid landline number");

const doctorCellphoneChain = check("cellphone")
    .custom(
        (cellphone) =>
            cellphone[2] === "9" &&
            cellphone.length === 11 &&
            RegExp("^[0-9]+$").test(cellphone) === true
    )
    .withMessage("Invalid cellphone number");

const doctorCepChain = check("cep")
    .isLength({ min: 8, max: 8 })
    .withMessage("CEP must have 8 numbers")
    .custom((cep) => RegExp("^[0-9]+$").test(cep) === true)
    .withMessage("CEP must have only numbers");

const doctorNumeroChain = check("numero")
    .not()
    .isString()
    .withMessage("Numero must be a number")
    .custom((numero) => numero > 0)
    .withMessage("Numero must be greater then 0");

const doctorSpecialtiesChain = check("specialties_names")
    .isArray({ min: 2 })
    .withMessage("Doctor must have at least 2 specialties");

doctorsRoutes.post(
    "/",
    doctorNameChain,
    doctorCrmChain,
    doctorLandlineChain,
    doctorCellphoneChain,
    doctorCepChain,
    doctorNumeroChain,
    doctorSpecialtiesChain,

    createDoctorController.handle
);

doctorsRoutes.put(
    "/update/:id",
    doctorNameChain.optional(),
    doctorCrmChain.optional(),
    doctorLandlineChain.optional(),
    doctorCellphoneChain.optional(),
    doctorCepChain.optional(),
    doctorNumeroChain.optional(),
    doctorSpecialtiesChain.optional(),
    updateDoctorController.handle
);

doctorsRoutes.get(
    "/filter",
    doctorNameChain.optional(),
    doctorCrmChain.optional(),
    doctorLandlineChain.optional(),
    doctorCellphoneChain.optional(),
    doctorCepChain.optional(),
    doctorNumeroChain.optional(),
    // doctorSpecialtiesChain.optional(),
    filterDoctorsController.handle
);
doctorsRoutes.get("/", listDoctorsController.handle);
doctorsRoutes.delete("/delete/:id", deleteDoctorController.handle);
doctorsRoutes.put("/recover/:id", recoverDoctorController.handle);

export { doctorsRoutes };
