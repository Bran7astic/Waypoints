import { useParams } from "react-router-dom";
import LogoutButton from "../../components/LogoutButton";
import { useContext, useEffect, useState } from "react";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { supabase } from "../../client";
import UserContext from "../../contexts/UserContext";
import PostView from "../Home/PostView";
import { CircularProgress } from "@mui/material";

export default function Profile() {

    const {username} = useContext(UserContext)
    const profileUsername = useParams().username

    const[userPosts, setUserPosts] = useState(null)

    useEffect(() => {
        const getPostsByUser = async () => {
            const {data, error} = await supabase
                .from('Posts')
                .select()
                .eq('username', profileUsername)

            error? console.log(error) : data.length > 0 && setUserPosts(data)
        }

        getPostsByUser()

    }, [])

    return(
        <div>
            <h1>{profileUsername}</h1>

            {username === profileUsername && (
                <div style={{marginBottom: "2em"}}>
                    <LogoutButton/>
                </div>
            )}


            {userPosts?.length > 0 ? (
                <PostView posts={userPosts} />
            ) : !userPosts ? (
                <p>This user either has no posts, or doesn't exist.</p>
            ) : (
                <CircularProgress color=""/>
            )}

        </div>
    );
}