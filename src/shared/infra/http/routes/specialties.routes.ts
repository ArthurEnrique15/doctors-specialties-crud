import { Router } from "express";

import { CreateSpecialtyController } from "@modules/specialties/useCases/createSpecialty/CreateSpecialtyController";
import { ListSpecialtiesController } from "@modules/specialties/useCases/listSpecialties/ListSpecialtiesController";
// import { RecoverSpecialtyController } from "@modules/specialties/useCases/recoverSpecialty/RecoverSpecialtyController";
// import { RemoveSpecialtyController } from "@modules/specialties/useCases/removeSpecialty/RemoveSpecialtyController";
// import { UpdateSpecialtyController } from "@modules/specialties/useCases/updateSpecialty/UpdateSpecialtyController";

const specialtiesRoutes = Router();

const createSpecialtyController = new CreateSpecialtyController();
const listSpecialtiesController = new ListSpecialtiesController();
// const removeSpecialtyController = new RemoveSpecialtyController();
// const recoverSpecialtyController = new RecoverSpecialtyController();
// const updateSpecialtyController = new UpdateSpecialtyController();

specialtiesRoutes.post("/", createSpecialtyController.handle);
specialtiesRoutes.get("/", listSpecialtiesController.handle);

// specialtiesRoutes.delete("/delete/:id", removeSpecialtyController.handle);

// specialtiesRoutes.put("/recover/:id", recoverSpecialtyController.handle);

// specialtiesRoutes.put("/update/:id", updateSpecialtyController.handle);

export { specialtiesRoutes };
