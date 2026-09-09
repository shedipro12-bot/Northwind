import axios from "axios";
import { UserModel } from "../models/user-model";
import { appConfig } from "../utils/app-config";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../models/credentials-model";
import { userSlice } from "../redux/user-slice";
import { store } from "../redux/store";

class UserService {

    public constructor() {

        // Get token from local storage: 
        const token = localStorage.getItem("token");

        // If we have token - save user in global state:
        if (token) {
            const dbUser = jwtDecode<{ user: UserModel }>(token).user;
            const action = userSlice.actions.initUser(dbUser);
            store.dispatch(action);
        }
        
    }

    // Register new user: 
    public async register(user: UserModel): Promise<void> {

        // Send user to backend: 
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // Get JWT token: 
        const token = response.data;

        // Extract user: 
        const dbUser = jwtDecode<{ user: UserModel }>(token).user;

        // Send user to global state: 
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

        // Save token in local storage:
        localStorage.setItem("token", token);
    }

    // Login existing user: 
    public async login(credentials: CredentialsModel): Promise<void> {

        // Send user to backend: 
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // Get JWT token: 
        const token = response.data;

        // Extract user: 
        const dbUser = jwtDecode<{ user: UserModel }>(token).user;

        // Send user to global state: 
        const action = userSlice.actions.initUser(dbUser);
        store.dispatch(action);

        // Save token in local storage:
        localStorage.setItem("token", token);
    }

    // Logout existing user: 
    public logout(): void {

        // Remove user from global state: 
        const action = userSlice.actions.logoutUser();
        store.dispatch(action);

        // Remove token from local storage: 
        localStorage.removeItem("token");
    }
}

export const userService = new UserService();
