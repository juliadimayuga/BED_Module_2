import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "src/data/employees";

/**
 * Creates a new employee after validation
 * @param req - Express request object
 * @param res - Express response object
 */
export const createEmployee = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {name, position, department, email, phone, branchId} = req.body;
        if (!name || ! position || !department || !email ||  !phone || branchId == null){
            res.status(400).json({ message: "Missing field."});
            return;
        }
        const newEmployee = await employeeService.createEmployee({
            name,
            position,
            department,
            email,
            phone,
            branchId
        });
        res.status(201).json({ 
            message: "Employee created successfully.", 
            data: newEmployee
        });
    }
    catch (error){
        res.status(500).json({ message: "Failed to create employee."})
    }
};

/**
 * Retrieves all employees
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllEmployees = async (req: Request, res: Response
): Promise<void> => {
    try{
        const employees = await employeeService.getAllEmployees();
        res.status(200).json({
            message: "Retrieved all employees successfully.",
            data: employees
        });
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve employees."});
    }
};

/**
 * Retrieves an employee by ID
 * @param req - Express request object
 * @param res - Express response object
 */
export const getEmployeeById = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {id} = req.params;
        const employee = await employeeService.getEmployeeById(Number(id));
        if (employee){
            res.status(200).json({
                message: "Employee retrieved successfully.",
                data: employee
            });
        }
        else{
            res.status(400).json({message: "Employee not found."})
        }
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve employee."})
    }
};