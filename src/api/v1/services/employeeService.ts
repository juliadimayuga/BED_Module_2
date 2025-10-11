import {Employee} from "../models/employeeModel";
import * as firestoreRepository from "../repositories/firestoreRepository"


const EMPLOYEES_COLLECTION = "employees";

/**
 * Retrieves all employees
 * @returns Array of all employees
 * @throws {Error} - If an error occurs during retrieval of employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try{
        const snapshot = await firestoreRepository.getDocuments(EMPLOYEES_COLLECTION);
        const employees: Employee[] = snapshot.docs.map(doc => ({
            id: Number(doc.id), 
            ...(doc.data() as Omit<Employee, "id">)
        }));
        return employees;
    }
    catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to get employees: ${errorMessage}`
        );
    }
};

/**
 * Retrieves employee by ID
 * @param id - The id of the employee to retrieve
 * @returns The employee that was retrieved or null if not found
 * @throws {Error} - If an error occurs during the employee retrieval
 */
export const getEmployeeById = async (id: number): Promise<Employee | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }
        return {id, ...(doc.data() as Omit<Employee, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to get employee ${id}: ${errorMessage}`);
    }
};

/**
 * Creates a new employee
 * @param employeeData - Only the fields needed to create an employee
 * @returns The created employee
 * @throws {Error} - If an error occurs during the employee creation
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">
): Promise<Employee> => {
    try{
        const id = await firestoreRepository.createDocument(
            EMPLOYEES_COLLECTION,
            employeeData
        );
        return {id: Number(id), ...employeeData};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create employee: ${errorMessage}`);
    }
};

/**
 * Updates an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - Only fields that can be updated
 * @returns The updated employee or null if not found
 * @throws {Error} - If an error occurs during document update.
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.updateDocument(
            EMPLOYEES_COLLECTION,
            id.toString(),
            employeeData
        );
        return {id, ...(employeeData as Omit<Employee, "id">)};
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to update employee ${id}: ${errorMessage}`);
    }
};

/**
 * Deletes an employee
 * @param id - The ID of the employee to delete
 * @returns The confirmation if the employee was deleted or undefined if not found
 * @throws {Error} - If an error occurs during employee deletion
 */
export const deleteEmployee = async (id: number
): Promise<boolean | null> => {
    try{
        const doc = await firestoreRepository.getDocumentById(
            EMPLOYEES_COLLECTION,
            id.toString()
        );
        if (!doc){
            return null
        }

        await firestoreRepository.deleteDocument(
            EMPLOYEES_COLLECTION,
            id.toString(),
        );
        return true;
    }
    catch (error:unknown){
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to delete employee ${id}: ${errorMessage}`);
    }
};

/**
 * Retrieves all employees from a branch
 * @param branchId - The specified branch
 * @returns An array of all the employees from that branch
 */
export const getAllEmployeesFromBranch = async (branchId: number
): Promise<Employee[]> => {
    const employeesFromBranch: Employee[] = [];

    for (const employee of employees){
        if (employee.branchId === branchId){
            employeesFromBranch.push(structuredClone(employee));
        }
    }

    return employeesFromBranch;
};

/**
 * Retrieves all employees from a department
 * @param department - The specified department
 * @returns An array of all the employees from that department
 */
export const getAllEmployeesFromDepartment = async (department: string
): Promise<Employee[]> => {
    const employeesFromDepartment: Employee[] = [];

    for (const employee of employees){
        if (employee.department === department){
            employeesFromDepartment.push(structuredClone(employee));
        }
    }

    return employeesFromDepartment;
};