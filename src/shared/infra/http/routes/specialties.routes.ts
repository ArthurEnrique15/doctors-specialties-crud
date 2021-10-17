import { Router } from "express";

import { CreateSpecialtyController } from "@modules/specialties/useCases/createSpecialty/CreateSpecialtyController";
import { DeleteSpecialtyController } from "@modules/specialties/useCases/deleteSpecialty/DeleteSpecialtyController";
import { ListSpecialtiesController } from "@modules/specialties/useCases/listSpecialties/ListSpecialtiesController";
import { RecoverSpecialtyController } from "@modules/specialties/useCases/recoverSpecialty/RecoverSpecialtyController";
import { UpdateSpecialtyController } from "@modules/specialties/useCases/updateSpecialty/UpdateSpecialtyController";

const specialtiesRoutes = Router();

const createSpecialtyController = new CreateSpecialtyController();
const listSpecialtiesController = new ListSpecialtiesController();
const updateSpecialtyController = new UpdateSpecialtyController();
const deleteSpecialtyController = new DeleteSpecialtyController();
const recoverSpecialtyController = new RecoverSpecialtyController();

specialtiesRoutes.post("/", createSpecialtyController.handle);
specialtiesRoutes.put("/update/:id", updateSpecialtyController.handle);
specialtiesRoutes.get("/", listSpecialtiesController.handle);
specialtiesRoutes.delete("/delete/:id", deleteSpecialtyController.handle);
specialtiesRoutes.put("/recover/:id", recoverSpecialtyController.handle);

export { specialtiesRoutes };
