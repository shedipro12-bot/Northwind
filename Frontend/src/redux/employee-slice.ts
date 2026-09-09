import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeeModel } from "../models/employee-model";

// Reducer - add employee:
function addEmployee(currentState: EmployeeModel[], action: PayloadAction<EmployeeModel>): EmployeeModel[] {
    const employeeToAdd = action.payload; // Take employee to add.
    const newState = [...currentState]; // Duplicate currentState into newState.
    newState.push(employeeToAdd); // Add the employee.
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - update employee: 
function updateEmployee(currentState: EmployeeModel[], action: PayloadAction<EmployeeModel>): EmployeeModel[] {
    const employeeToUpdate = action.payload; // Take employee to update.
    const newState = [...currentState]; // Duplicate currentState into newState.
    const index = newState.findIndex(p => p.id === employeeToUpdate.id); // Find the index of the employee to update.
    if(index >= 0) {
        newState[index] = employeeToUpdate; // Update that employee.
    }
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - delete employee: 
function deleteEmployee(currentState: EmployeeModel[], action: PayloadAction<number>): EmployeeModel[] {
    const idToDelete = action.payload; // Take employee id to delete.
    const newState = [...currentState]; // Duplicate currentState into newState.
    const index = newState.findIndex(p => p.id === idToDelete); // Find the index of the employee to delete.
    if(index >= 0) {
        newState.splice(index, 1); // Delete that employee.
    }
    return newState; // Return the new state so it could replace the currentState.
}

// Reducer - init all employees: 
function initEmployees(_currentState: EmployeeModel[], action: PayloadAction<EmployeeModel[]>): EmployeeModel[] {
    const employeesToInit = action.payload; // Take all employees to init.
    const newState = employeesToInit; // New state is the given employees.
    return newState; // Return new state to init all employees.
}

// Slice for handling employees:
export const employeeSlice = createSlice({
    name: "employee-slice", // Unique name for this slice.
    initialState: [] as EmployeeModel[], // The initial state before calling any reducer.
    reducers: { addEmployee, updateEmployee, deleteEmployee, initEmployees } // Our reducers.
});
