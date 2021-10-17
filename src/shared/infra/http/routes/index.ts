import { Router } from "express";

import { specialtiesRoutes } from "./specialties.routes";

const router = Router();

router.use("/specialties", specialtiesRoutes);

export { router };
