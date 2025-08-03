import { useParams } from "react-router-dom";
import PostForm from "../Post/PostForm";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { CircularProgress } from "@mui/material";

export default function Edit() {

    const post_id = useParams().post_id
    const [post, setPost] = useState(null) 

    useEffect(() => {
        const getPost = async() => {
            const {data, error} = await supabase
                .from('Posts')
                .select()
                .eq('post_id', post_id)

            error ? console.error(error) : setPost(data[0])
        }

        getPost()

    }, [])

    // useEffect(() => {
    //     console.log(post)
    // }, [post])

    return(
        <div>
            <h1>Edit Post</h1>
            {post ? (
                <PostForm editable post={post} />
            ) : (
                <CircularProgress color="#81A094"/>
            )}
        </div>
    );
}