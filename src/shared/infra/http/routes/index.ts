import { Router } from "express";

import { doctorsRoutes } from "./doctors.routes";
import { specialtiesRoutes } from "./specialties.routes";

const router = Router();

router.use("/specialties", specialtiesRoutes);
router.use("/doctors", doctorsRoutes);

export { router };
