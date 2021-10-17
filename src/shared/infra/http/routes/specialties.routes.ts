import { Router } from "express";

import { CreateSpecialtyController } from "@modules/specialties/useCases/createSpecialty/CreateSpecialtyController";
import { ListSpecialtiesController } from "@modules/specialties/useCases/listSpecialties/ListSpecialtiesController";
import { UpdateSpecialtyController } from "@modules/specialties/useCases/updateSpecialty/UpdateSpecialtyController";
// import { RecoverSpecialtyController } from "@modules/specialties/useCases/recoverSpecialty/RecoverSpecialtyController";
// import { RemoveSpecialtyController } from "@modules/specialties/useCases/removeSpecialty/RemoveSpecialtyController";

const specialtiesRoutes = Router();

const createSpecialtyController = new CreateSpecialtyController();
const listSpecialtiesController = new ListSpecialtiesController();
const updateSpecialtyController = new UpdateSpecialtyController();
// const removeSpecialtyController = new RemoveSpecialtyController();
// const recoverSpecialtyController = new RecoverSpecialtyController();

specialtiesRoutes.post("/", createSpecialtyController.handle);
specialtiesRoutes.put("/update/:id", updateSpecialtyController.handle);
specialtiesRoutes.get("/", listSpecialtiesController.handle);

// specialtiesRoutes.delete("/delete/:id", removeSpecialtyController.handle);

// specialtiesRoutes.put("/recover/:id", recoverSpecialtyController.handle);

export { specialtiesRoutes };
