import { useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useEffect } from "react";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export default function Profile() {

    const user_id = useParams().user_id

    // useEffect(() => {
    //     useAuthRedirect()
    // }, [])

    return(
        <div>
            <h1>Profile for {user_id}</h1>
            <LogoutButton/>
        </div>
    );
}