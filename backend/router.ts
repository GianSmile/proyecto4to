import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:username", controllers.getUser);
router.get("/user/:username/pets", controllers.getUserPets);
router.get("/user/:username/analyses", controllers.getUserAnalyses);
router.get("/pet/:petId", controllers.getPet);
router.get("/pet/:petId/analyses", controllers.getPetAnalyses);
router.get("/analysis/:analysisId", controllers.getAnalysis);

export default router;