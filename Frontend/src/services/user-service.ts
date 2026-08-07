import axios from "axios";
import { UserModel } from "../models/user-model";
import { appConfig } from "../utils/appconfig";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../models/credential-model";
import { userSlice } from "../redux/user-slice";
import { store } from "../redux/store";

class UserService {

    public constructor() {
        //Get token from local storage:
        const token = localStorage.getItem("token")

        // if token exist save the user in global state
        if (token) {
            const dbUser = jwtDecode<{ user: UserModel }>(token).user
            const action = userSlice.actions.initUser(dbUser);
            store.dispatch(action);
        }
    }
    // register User
    public async register(user: UserModel): Promise<void> {

        // Send the use created User to the backend
        const response = await axios.post(appConfig.registerUrl, user);
        console.log(response.data);
        //Get JWT token:
        const token = response.data;

        // Extract user:
        const dbUser = jwtDecode<{ user: UserModel }>(token).user
        console.log(dbUser);

        const action = userSlice.actions.initUser(dbUser)
        store.dispatch(action)



    }
    // Login existing user:
    public async login(credntials: CredentialsModel): Promise<void> {

        // Send the use created User to the backend
        const response = await axios.post(appConfig.loginUrl, credntials);
        console.log(response.data);
        //Get JWT token:
        const token = response.data;

        // Extract user:
        const dbUser = jwtDecode<{ credentials: CredentialsModel }>(token).credentials
        console.log(dbUser);
        // Save token in local storage;
        localStorage.setItem("token", token);



    }
    public logout(): void {
        const action = userSlice.actions.logoutUser()
        store.dispatch(action);

        //Remove token from local Storage:
        localStorage.removeItem("token");
    }
}

export const userService = new UserService();
