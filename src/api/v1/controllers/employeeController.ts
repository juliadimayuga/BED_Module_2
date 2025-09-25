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