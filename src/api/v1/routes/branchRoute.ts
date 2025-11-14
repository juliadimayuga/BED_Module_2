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

/**
 * @openapi
 * /branches
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: Branches retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/branches", getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Retrieve a branch by it's ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The specific branch's ID
 *     responses:
 *       '200':
 *         description: Branch retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Branch'
 *       '404':
 *          description: Branch not found
 */
router.get("/branches/:id", getBranchById);
router.post("/branches", validateCreateBranch, createBranch);
router.put("/branches/:id", validateCreateBranch, updateBranch);
router.delete("/branches/:id", deleteBranch);

export default router;