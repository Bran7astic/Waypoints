import { useEffect, useState } from "react";
import { supabase } from "../client";
import AuthContext from "./AuthContext";

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)

    useEffect(() => {

        const getUser = async() => {
            const {data: {user}} = await supabase.auth.getUser()
            setUser(user)
        }
        
        getUser()

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            // console.log("Event:", event)
            // console.log("Session:", session)
            setUser(session?.user ?? null)
        })

        return () => data.subscription.unsubscribe()

    }, [])

    return(
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )

}
