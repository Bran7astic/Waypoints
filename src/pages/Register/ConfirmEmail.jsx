import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ConfirmEmail() {

    const { session } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (session) {
            navigate('/home')
        }
    }, [session])

    return(
        <h1>Please confirm your signup to continue!</h1>
    );
}