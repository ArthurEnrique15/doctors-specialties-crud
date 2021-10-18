import { Router } from "express";

// import { CreateDoctorController } from "@modules/doctors/useCases/createDoctor/CreateDoctorController";
// import { DeleteDoctorController } from "@modules/doctors/useCases/deleteDoctor/DeleteDoctorController";
// import { ListDoctorsController } from "@modules/doctors/useCases/listDoctors/ListDoctorsController";
// import { RecoverDoctorController } from "@modules/doctors/useCases/recoverDoctor/RecoverDoctorController";
// import { UpdateDoctorController } from "@modules/doctors/useCases/updateDoctor/UpdateDoctorController";

const doctorsRoutes = Router();

// const createDoctorController = new CreateDoctorController();
// const listDoctorsController = new ListDoctorsController();
// const updateDoctorController = new UpdateDoctorController();
// const deleteDoctorController = new DeleteDoctorController();
// const recoverDoctorController = new RecoverDoctorController();

// doctorsRoutes.post("/", createDoctorController.handle);
// doctorsRoutes.put("/update/:id", updateDoctorController.handle);
// doctorsRoutes.get("/", listDoctorsController.handle);
// doctorsRoutes.delete("/delete/:id", deleteDoctorController.handle);
// doctorsRoutes.put("/recover/:id", recoverDoctorController.handle);

export { doctorsRoutes };
