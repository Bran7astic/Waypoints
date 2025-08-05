import { useContext, useState } from "react"
import { supabase } from "../client";
import UserContext from "../contexts/UserContext";

export default function LikeIcon({post_id}) {
    
    const [liked, setLiked] = useState(false)
    const [likeState, setLikeState] = useState("")
    
    const [uid] = useContext(UserContext)


    const handleLike = () => {
        setLiked(true);
        setLikeState((prev) => prev + 1);

        const addLike = async() => {
            const{data, error} = await supabase
                .from('Likes')
                .insert({

                })
        }
    };

    const handleUnlike = () => {
        setLiked(false);
        setLikeState((prev) => prev - 1);
    };

    return(

        <div>
            {liked ? (
            <Favorite onClick={handleUnlike}/>
            ) : (
            <FavoriteBorder onClick={handleLike}/>
            )}
        </div>
    )
}