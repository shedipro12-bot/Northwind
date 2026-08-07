import { useSelector } from "react-redux";
import { AppState } from "../redux/app-state";
import { UserModel } from "../models/user-model";
import { useNavigate } from "react-router-dom";
import {  useEffect } from "react";

import { Role } from "../models/enums";
import { notify } from "../utils/notify";

export function useAdmin() {
    const user = useSelector<AppState, UserModel>(state => state.user);
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== Role.Admin) {
            notify.error("You're are not Authorized!");
            navigate("/login");

        }
    }, [])
}