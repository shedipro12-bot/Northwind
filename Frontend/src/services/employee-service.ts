import axios from "axios";
import { EmployeeModel } from "../models/employee-model";
import { appConfig } from "../utils/appconfig";
import { store } from "../redux/store";
import { empoloyeeSlice } from "../redux/employee-slice";

class EmployeeService {

    // Fetch all employees:
    public async getAllEmployees(): Promise<EmployeeModel[]> {

        // If we have employees in global state - return them:
        if (store.getState().employee.length > 0) {
            return store.getState().employee;
        }

        // We don't have employees in our global - get them from backend:
        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);
        const employees = response.data;

        // Init all employees in global state:
        // const type = "employee-slice/employeeInitial"; // "slice-name/reducer-name"
        // const payload = employees;
        // const action = { type, payload };
        const action = empoloyeeSlice.actions.employeeInitial(employees) // Same as the 3 lines above 
        store.dispatch(action);

        return employees;
    }
    // Fetch one employee:
    public async getOneEmployee(id: number): Promise<EmployeeModel> {
        // if employees already exist in our global state 0 return it:
        const employee = store.getState().employee.find((e: EmployeeModel) => e.id === id);
        if (employee) {
            return employee
        }
        const response = await axios.get<EmployeeModel>(appConfig.employeesUrl + "/" + id);
        const dbEmployee = response.data;
        // return backend employee:
        return dbEmployee;
    }



    // Add employee: 
    public async addEmployee(employee: EmployeeModel): Promise<void> {
        // Send employee to backend:
        const response = await axios.post<EmployeeModel>(appConfig.employeesUrl, employee);
        const dbEmployee = response.data;
        // Add employee to global state:
        const action = empoloyeeSlice.actions.addEmployee(dbEmployee)
        store.dispatch(action)
    }

    // Update employee: 
    public async updateEmployee(employee: EmployeeModel): Promise<void> {
        // Send employee to backend
        const response = await axios.put<EmployeeModel>(appConfig.employeesUrl + "/" + employee.id, employee);
        const dbEmployee = response.data;
        // Update employee in global state
        const action = empoloyeeSlice.actions.updateEmployee(dbEmployee);
        store.dispatch(action);

    }

    // Delete employee:
    public async deleteEmployee(id: number): Promise<void> {
        // Delete employee from backend:
        await axios.delete(appConfig.employeesUrl + "/" + id);
        // Delete employee from global state:
        const action = empoloyeeSlice.actions.deleteEmployee(id)
        store.dispatch(action);
    }

}

export const employeeService = new EmployeeService();