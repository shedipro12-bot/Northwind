/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import "./sign-up.css";
import { UserModel } from "../../../models/user-model";
import { notify } from "../../../utils/notify";
import { userService } from "../../../services/user-service";
import { useNavigate } from "react-router";
import { Button, ButtonGroup, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { appConfig } from "../../../utils/appconfig";
import { useState } from "react";
export function SignUp() {
    const { register, handleSubmit } = useForm<UserModel>();
    const [captchaToken, setCaptchaToken] = useState<string | null>("")
    const navigate = useNavigate()
    async function send(user: UserModel) {
        if (!captchaToken) {
            notify.error(`Please check the "i'm not a robot" checkbox.`);
            return
        }
        try {
            user.captchaToken = captchaToken;
            await userService.register(user)
            notify.success("Welcome" + user.firstName)
            navigate("/home")
        }
        catch (err: any) {
            notify.error(err)
        }
    }
    function saveCaptchaToken(captchaToken: string | null): void {
        setCaptchaToken(captchaToken);

    }


    return (
        <div className="SignUp">

            <Typography variant="h4" color="secondary">
                Register to NorthWind
            </Typography>
            <form onSubmit={handleSubmit(send)}>

                <TextField label="First name" {...register("firstName")} fullWidth />
                <TextField label="Last name" {...register("lastName")} fullWidth />
                <TextField label="Email" type="email" {...register("email")} fullWidth />
                <TextField label="Password" type="password" {...register("password")} fullWidth />

                <FormControlLabel label="Send me the promotional emails" control={<Checkbox />} />


                <ReCAPTCHA sitekey={appConfig.recaptchaSiteKey} onChange={saveCaptchaToken} />
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">Sign In</Button>
                    <Button type="reset" color="secondary">Clear</Button>
                </ButtonGroup>







                {/* <label>Firstname</label>
                <input type="text"{...register("firstName")} /> */}


                {/* <label>Lastname</label>
                <input type="text" {...register("lastName")} />


                <label>Email</label>
                <input type="email" {...register("email")} />


                <label>Password</label>
                <input type="password" {...register("password")} /> */}

                {/* <button >Sign up</button> */}

            </form>

        </div>
    );
}
