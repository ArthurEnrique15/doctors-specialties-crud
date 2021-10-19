import { Router } from "express";
import { check } from "express-validator";

import { CreateDoctorController } from "@modules/doctors/useCases/createDoctor/CreateDoctorController";
// import { DeleteDoctorController } from "@modules/doctors/useCases/deleteDoctor/DeleteDoctorController";
import { ListDoctorsController } from "@modules/doctors/useCases/listDoctors/ListDoctorsController";
// import { RecoverDoctorController } from "@modules/doctors/useCases/recoverDoctor/RecoverDoctorController";
// import { UpdateDoctorController } from "@modules/doctors/useCases/updateDoctor/UpdateDoctorController";

const doctorsRoutes = Router();

const createDoctorController = new CreateDoctorController();
const listDoctorsController = new ListDoctorsController();
// const updateDoctorController = new UpdateDoctorController();
// const deleteDoctorController = new DeleteDoctorController();
// const recoverDoctorController = new RecoverDoctorController();

doctorsRoutes.post(
    "/",
    check("name")
        .isString()
        .withMessage("Name must be a string")
        .notEmpty()
        .withMessage("Name cannot be empty")
        .isLength({ min: 0, max: 120 })
        .withMessage("Name must have a maximum of 120 characters"),

    check("crm")
        .isString()
        .withMessage("CRM must be a string")
        .notEmpty()
        .withMessage("CRM cannot be empty")
        .isLength({ min: 0, max: 7 })
        .withMessage("CRM must have a maximum of 7 numbers")
        .custom((crm) => RegExp("^[0-9]+$").test(crm) === true)
        .withMessage("CRM must have only numbers"),

    check("landline")
        .isMobilePhone("pt-BR")
        .withMessage("Invalid landline number"),

    check("cellphone")
        .custom(
            (cellphone) =>
                cellphone[2] === "9" &&
                cellphone.length === 11 &&
                RegExp("^[0-9]+$").test(cellphone) === true
        )
        .withMessage("Invalid cellphone number"),

    check("cep")
        .isLength({ min: 8, max: 8 })
        .withMessage("CEP must have 8 numbers")
        .custom((cep) => RegExp("^[0-9]+$").test(cep) === true)
        .withMessage("CEP must have only numbers"),

    check("numero")
        .not()
        .isString()
        .withMessage("Numero must be a number")
        .custom((numero) => numero > 0)
        .withMessage("Numero must be greater then 0"),

    check("specialties_names")
        .isArray({ min: 2 })
        .withMessage("Doctor must have at least 2 specialties"),

    createDoctorController.handle
);
// doctorsRoutes.put("/update/:id", updateDoctorController.handle);
doctorsRoutes.get("/", listDoctorsController.handle);
// doctorsRoutes.delete("/delete/:id", deleteDoctorController.handle);
// doctorsRoutes.put("/recover/:id", recoverDoctorController.handle);

export { doctorsRoutes };
