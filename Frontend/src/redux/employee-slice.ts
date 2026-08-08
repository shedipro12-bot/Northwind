import { PayloadAction } from "@reduxjs/toolkit";
import { EmployeeModel } from "../models/employee-model";
import { createSlice } from "@reduxjs/toolkit";

function employeeInitial(_currentState: EmployeeModel[], action: PayloadAction<EmployeeModel[]>): EmployeeModel[] {
    const employeeToInit = action.payload; // Take all employees to initialization.
    const newState = employeeToInit;
    return newState;
}

function addEmployee(currentState: EmployeeModel[], action: PayloadAction<EmployeeModel>): EmployeeModel[] {
    const employeeToAdd = action.payload;
    const newState = [...currentState];
    newState.push(employeeToAdd)
    return newState;
}

function updateEmployee(currentState: EmployeeModel[], action: PayloadAction<EmployeeModel>): EmployeeModel[] {
    const employeeToUpdate = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(e => e.id === employeeToUpdate.id)
    if (index >= 0) {
        newState[index] = employeeToUpdate;
    }
    return newState;
}

function deleteEmployee(currentState: EmployeeModel[], action: PayloadAction<number>): EmployeeModel[] {
    const idToDelete = action.payload;
    const newState = [...currentState];
    const index = newState.findIndex(e => e.id === idToDelete);
    if (index >= 0) {
        newState.splice(index, 1); // Delete the specific employee
    }
    return newState;
}

export const employeeSlice = createSlice({
    name: "employee-slice", // Unique name for this slice.
    initialState: [] as EmployeeModel[], // The inital state before calling any reducer
    reducers: { addEmployee, updateEmployee, deleteEmployee, employeeInitial } // Our reducers
});