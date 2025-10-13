import express, { Router } from "express";
import {
    getAllBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
} from "../controllers/branchController";
import { validateCreateBranch } from "../middleware/validatorMiddleware";

const router: Router = express.Router();

router.get("/branches", getAllBranches);
router.get("/branches/:id", getBranchById);
router.post("/branches", validateCreateBranch, createBranch);
router.put("/branches/:id", validateCreateBranch, updateBranch);
router.delete("/branches/:id", deleteBranch);

export default router;