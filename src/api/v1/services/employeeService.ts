import {Employee, employees} from "../../../data/employees"

/**
 * Retrieves all employees
 * @returns Array of all employees
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(employees);
};

/**
 * Creates a new employee
 * @param employeeData - Only the fields needed to create an employee
 * @returns The created employee
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const newEmployee: Employee = {
        id: Date.now(),
        name: employeeData.name,
        position: employeeData.position,
        department: employeeData.department,
        email: employeeData.email,
        phone: employeeData.phone,
        branchId: employeeData.branchId
    }
    employees.push(newEmployee);
    return newEmployee;
};

/**
 * Updates an existing employee
 * @param id - The ID of the employee to update
 * @param employeeData - Only fields that can be updated
 * @returns The updated employee or undefined if not found
 */
export const updateEmployee = async (
    id: number,
    employeeData: Pick<Employee, "name" | "position" | "department" | "email" | "phone" | "branchId">
): Promise<Employee | undefined> => {
    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1){
        return undefined;
    }

    employees[index] = {
        ...employees[index],
        ...employeeData,
    };

    return structuredClone(employees[index]);
};

/**
 * Deletes an employee
 * @param id - The ID of the employee to delete
 * @returns The confirmation if the employee was deleted or undefined if not found
 */
export const deleteEmployee = async (id: number): Promise<string | undefined> => {
    const index: number = employees.findIndex((employee: Employee) => employee.id === id);

    if (index === -1){
        return undefined;
    }

    employees.splice(index, 1);
    return "Employee deleted successfully.";
}