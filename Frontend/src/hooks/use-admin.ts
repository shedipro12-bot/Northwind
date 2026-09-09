import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import { UserModel } from "../models/user-model";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Role } from "../models/enums";
import { notify } from "../utils/notify";

// Custom hook for checking if user is Admin:
export function useAdmin(): void {

    const user = useSelector<AppState, UserModel>(state => state.user);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user?.role !== Role.Admin) {
            notify.error("You are not authorized!");
            navigate("/signin");
        }
    }, []);

}
