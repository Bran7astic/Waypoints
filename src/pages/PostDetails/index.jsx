import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../client";
import PostCard from "../Home/PostCard";
import useGetUsername from "../../hooks/useGetUsername";

export default function PostDetails() {

    const id = useParams().id
    const [username, setUsername] = useState("")
    const [details, setDetails] = useState(null)

    useEffect(() => {
        const getPostDetails = async () => {
            const {data, error} = await supabase
                .from('Posts')
                .select()
                .eq('post_id', id)
            
                error ? console.error(error) : setDetails(data[0])
        }

        getPostDetails()

    }, [])

    useEffect(() => {
        
        const fetchUsername = async() => {
            if (details) {

                const {data, error} = await supabase
                .from('Profiles')
                .select('username')
                .eq('user_id', details?.user_id)

                error ? console.error(error) : setUsername(data[0]?.username)
            }
        }

        fetchUsername()
        const date = new Date(details?.created_at);
        return date.toLocaleDateString();


    }, [details])

    return (
        <div>
            {details && (
                <div>
                    <h2>{details.location}</h2>
                    <img src={details.imageUrl}/>
                    <p><b>{username}:</b> {details.caption}</p>
                    <p></p>
                </div>
            )}
        </div>
    );
}