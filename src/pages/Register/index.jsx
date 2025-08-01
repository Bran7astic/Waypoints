import { useContext, useEffect } from "react";
import RegisterCard from "./RegisterCard";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export default function Register() {

    useAuthRedirect()

    return(
        <div>
            <h1>Register</h1>
            <RegisterCard/>
        </div>
    );
}