import { Router } from "express";
import * as controllers from "./controllers";

const router = Router();

router.get("/user/:userName", controllers.getUser);
router.get("/user/:userName/pets", controllers.getUserPets);
router.get("/user/:userName/analyses", controllers.getUserAnalyses);
router.get("/pet/:petId", controllers.getPet);
router.get("/pet/:petId/analyses", controllers.getPetAnalyses);
router.get("/analysis/:analysisId", controllers.getAnalysis);

module.exports = router;