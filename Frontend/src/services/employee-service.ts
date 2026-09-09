import axios from "axios";
import { EmployeeModel } from "../models/employee-model";
import { store } from "../redux/store";
import { appConfig } from "../utils/app-config";
import { employeeSlice } from "../redux/employee-slice";

class EmployeeService {

    // Fetch all employees:
	public async getAllEmployees(): Promise<EmployeeModel[]> {

        // If we already have the employees in our global state - return them: 
        if(store.getState().employees.length > 0) {
            return store.getState().employees;
        }

        // Fetch employees from backend: 
        const response = await axios.get<EmployeeModel[]>(appConfig.employeesUrl);
        const employees = response.data;

        // Init employees in global state: 
        const action = employeeSlice.actions.initEmployees(employees);
        store.dispatch(action);

        // Return backend employees:
        return employees;
    }

}

export const employeeService = new EmployeeService();
