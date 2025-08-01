import { useEffect, useState } from "react";
import { supabase } from "../client";
import AuthContext from "./AuthContext";

export function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)

    useEffect(() => {

        const getUser = async() => {
            const {data: {user}} = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        
        setLoading(true)
        getUser()

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log("Event:", event)
            console.log("Session:", session)
            setUser(session?.user ?? null)
            setSession(session)
            setLoading(false)
        })

        return () => data.subscription.unsubscribe()

    }, [])

    // useEffect(() => {
    //     console.log(`Loading status: ${loading}`)
    //     console.log("User:", user)
    // }, [loading])

    return(
        <AuthContext.Provider value={{user, loading, session}}>
            {children}
        </AuthContext.Provider>
    )

}
