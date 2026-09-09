import { useForm } from "react-hook-form";
import "./sign-in.css";
import { CredentialsModel } from "../../../models/credentials-model";
import { notify } from "../../../utils/notify";
import { userService } from "../../../services/user-service";
import { useNavigate } from "react-router-dom";

export function SignIn() {

    const { register, handleSubmit } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome back!");
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="SignIn">

            <form onSubmit={handleSubmit(send)}>

                <label>Email</label>
                <input type="email" {...register("email")} />

                <label>Password</label>
                <input type="password" {...register("password")} />

                <button>Sign In</button>

            </form>

        </div>
    );
}
