import { Request, Response } from "express";
import * as branchService from "../services/branchService";

/**
 * Creates a new branch after validation
 * @param req - Express request object
 * @param res - Express response object
 */
export const createBranch = async (req: Request, res: Response
): Promise<void> => {
    try{
        const {name, address, phone} = req.body;
        if (!name || !address || !phone){
            res.status(400).json({ message: "Missing field."});
            return;
        }
        const newBranch = await branchService.createBranch({
            name,
            address,
            phone
        });
        res.status(201).json({ 
            message: "Branch created successfully.", 
            data: newBranch
        });
    }
    catch (error){
        res.status(500).json({ message: "Failed to create branch."})
    }
};

/**
 * Retrieves all branches
 * @param req - Express request object
 * @param res - Express response object
 */
export const getAllBranches = async (req: Request, res: Response
): Promise<void> => {
    try{
        const branches = await branchService.getAllBranches();
        res.status(200).json({
            message: "Retrieved all branches successfully.",
            data: branches
        });
    }
    catch (error){
        res.status(500).json({message: "Failed to retrieve branches."});
    }
};