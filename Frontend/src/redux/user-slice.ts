import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/user-model";

// Reducer - init a user:
function initUser(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const userToInit = action.payload; // Take user to init.
    const newState = userToInit; // New state is the given user.
    return newState; // Return new state to init the user.
}

// Reducer - logout the user:
function logoutUser(_currentState: UserModel, _action: Action): UserModel {
    return null!;
}

// User slice: 
export const userSlice = createSlice({
    name: "user-slice",
    initialState: null! as UserModel,
    reducers: { initUser, logoutUser }
});
