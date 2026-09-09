import { useAdmin } from "../../../hooks/use-admin";
import "./admin.css";

// Shift + Alt + O

export function Admin() {

    useAdmin();

    return (
        <div className="Admin">

            <p>Admin Component</p>

        </div>
    );
}
