import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import Feed from "./Feed";


export default function Home() {

    // const { user } = useContext(AuthContext)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     console.log(user)
    //     if (!user) {
    //         navigate('/')
    //     }
    // }, [user])

    useAuthRedirect("/")


    return(
        <div>
            <h1>Waypoints</h1>
            <Feed/>
        </div>
        
    );
}