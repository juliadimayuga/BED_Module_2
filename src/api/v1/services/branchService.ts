import {Branch, branches} from "../../../data/branches";
import * as firestoreRepository from "../repositories/firestoreRepository"


const BRANCHES_COLLECTION = "branches";

/**
 * Retrieves all branches
 * @returns Array of all branches
 * @throws {Error} - If an error occurs during retrieval of branches
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try{
            const snapshot = await firestoreRepository.getDocuments(BRANCHES_COLLECTION);
            const branches: Branch[] = snapshot.docs.map(doc => ({
                id: Number(doc.id), 
                ...(doc.data() as Omit<Branch, "id">)
            }));
            return branches;
        }
        catch (error: unknown) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown error";
            throw new Error(
                `Failed to get branches: ${errorMessage}`
            );
        }
};

/**
 * Retrieves branch by ID
 * @returns The branch that was retrieved or null if not found
 * @throws {Error} - If an error occurs during the branch retrieval
 */
export const getBranchById = async (id: number): Promise<Branch | null> => {
    try{
            const doc = await firestoreRepository.getDocumentById(
                BRANCHES_COLLECTION,
                id.toString()
            );
            if (!doc){
                return null
            }
            return {id, ...(doc.data() as Omit<Branch, "id">)};
        }
        catch (error:unknown){
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to get branch ${id}: ${errorMessage}`);
        }
};

/**
 * Creates a new branch
 * @param branchData - Only the fields needed to create a branch
 * @returns The created branch
 * @throws {Error} - If an error occurs during the branch creation
 */
export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    try{
            const id = await firestoreRepository.createDocument(
                BRANCHES_COLLECTION,
                branchData
            );
            return {id: Number(id), ...branchData};
        }
        catch (error:unknown){
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            throw new Error(`Failed to create branch: ${errorMessage}`);
        }
};

/**
 * Updates an existing branch
 * @param id - The ID of the branch to update
 * @param branchData - Only fields that can be updated
 * @returns The updated branch or undefined if not found
 */
export const updateBranch = async (
    id: number,
    branchData: Pick<Branch, "name" | "address" | "phone">
): Promise<Branch | undefined> => {
    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1){
        return undefined;
    }

    branches[index] = {
        ...branches[index],
        ...branchData,
    };

    return structuredClone(branches[index]);
};

/**
 * Deletes a branch
 * @param id - The ID of the branch to delete
 * @returns The confirmation if the branch was deleted or undefined if not found
 */
export const deleteBranch = async (id: number): Promise<string | undefined> => {
    const index: number = branches.findIndex((branch: Branch) => branch.id === id);

    if (index === -1){
        return undefined;
    }

    branches.splice(index, 1);
    return "Branch deleted successfully.";
};