import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";
import useAuthRedirect from "../../hooks/useAuthRedirect";


export default function Feed() {

    // const { user } = useContext(AuthContext)
    // const navigate = useNavigate()

    // useEffect(() => {
    //     console.log(user)
    //     if (!user) {
    //         navigate('/')
    //     }
    // }, [user])

    useAuthRedirect("/")

    const handleLogout = () => {
        const logout = async() => {
            const { error } = await supabase.auth.signOut()

            if (error) console.log(error);

        }

        logout()
    }

    return(
        <div>
            <h1>Feed</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
        
    );
}