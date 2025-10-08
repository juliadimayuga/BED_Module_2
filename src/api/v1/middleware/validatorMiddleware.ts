import { Request, Response, NextFunction } from "express";
import { createEmployeeSchema } from "../validators/employeeValidators";

export const createEmployee = (req: Request, res: Response, next: NextFunction) => {
    const {error} = createEmployeeSchema.validate(req.body, { abortEarly: false });

    if (error){
        return res.status(400).json({
            message: "Validation failed",
            details: error.details.map(d => d.message)
        });
    }
    next();
};