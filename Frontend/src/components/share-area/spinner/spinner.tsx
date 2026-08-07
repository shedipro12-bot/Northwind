import "./spinner.css";
import loading from "../../../assets/loading.png";
export function Spinner() {
    return (
        <div className="Spinner">

            <p>Loading...</p>
            <img src={loading} alt="" />

        </div>
    );
}
