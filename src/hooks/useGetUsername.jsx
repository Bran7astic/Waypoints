import { useEffect, useState } from "react"
import { supabase } from "../client"

export default function useGetUsername (user_id) {

    const [username, setUsername] = useState("")

    useEffect(() => {

        const getUsername = async () => {

            if (user_id) {

                const {data, error} = await supabase
                .from('Profiles')
                .select('username')
                .eq('user_id', user_id)
                
                error && console.error(error) 
                setUsername(data[0]?.username)
                
            }
        }

        getUsername()

    }, [user_id])

    return username

}