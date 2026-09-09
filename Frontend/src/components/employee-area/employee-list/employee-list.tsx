import { useEffect, useState } from "react";
import "./employee-list.css";
import { EmployeeModel } from "../../../models/employee-model";
import { employeeService } from "../../../services/employee-service";
import { notify } from "../../../utils/notify";

export function EmployeeList() {

    const [employees, setEmployees] = useState<EmployeeModel[]>([]);

    useEffect(()=>{
        employeeService.getAllEmployees()
            .then(employees => setEmployees(employees))
            .catch(err => notify.error(err));
    }, []);

    return (
        <div className="EmployeeList">

			{employees.map(emp => <p key={emp.id}>{emp.firstName} {emp.lastName} ❤️</p>)}

        </div>
    );
}
