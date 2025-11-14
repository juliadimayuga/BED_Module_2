import express, { Router } from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAllEmployeesFromBranch,
    getAllEmployeesFromDepartment
} from "../controllers/employeeController";
import { validateCreateEmployee } from "../middleware/validatorMiddleware";

const router: Router = express.Router();

/**
 * @openapi
 * /employees
 *   get:
 *     summary: Retrieve all employees
 *     tags: [Employees]
 *     responses:
 *       '200':
 *         description: Employees retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
router.get("/employees", getAllEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Retrieve an employee by their ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The specific employee's ID
 *     responses:
 *       '200':
 *         description: Employee retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/Employee'
 *       '404':
 *          description: Employee not found
 */
router.get("/employees/:id", getEmployeeById);
router.post("/employees", validateCreateEmployee, createEmployee);
router.put("/employees/:id", validateCreateEmployee, updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.get("/employees/branch/:branchId", getAllEmployeesFromBranch);
router.get("/employees/department/:department", getAllEmployeesFromDepartment);

export default router;