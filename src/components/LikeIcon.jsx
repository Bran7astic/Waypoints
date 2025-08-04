import { useState } from "react"

export default function LikeIcon() {
    
    const [liked, setLiked] = useState(false)
    const [likesState, setLikesState] = useState("")
    
    return(

        <div>
            {liked ? (
            <Favorite />
            ) : (
            <FavoriteBorder />
            )}
        </div>
    )
}