import { useContext, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import UserContext from "./UserContext";
import { supabase } from "../client";

export default function UserProvider({children}) {
    const [username, setUsername] = useState("")
    const [uid, setUid] = useState("")

    const { user } = useContext(AuthContext)
    
    useEffect(() => { 

        const getUsername = async () => {
            const {data, error} = await supabase
                .from('Profiles')
                .select('username')
                .eq('user_id', user?.id)

            error? console.error(error) : setUsername(data[0].username)
        }

        if (user) {
            setUid(user.id)
            getUsername()
        }
    }, [user])

    useEffect(() => {
        console.log("Username:", username)
    }, [username])


    return(
        <UserContext.Provider value={{username, uid}}>
            {children}
        </UserContext.Provider>
    )
}