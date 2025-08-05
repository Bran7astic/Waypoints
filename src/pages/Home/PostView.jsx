import { CircularProgress } from "@mui/material";
import PostCard from "./PostCard";
import { Bounce, Fade } from "react-awesome-reveal";

export default function PostView({ posts }) {
  return (
    <div className="feedContainer">
      {posts.length > 0 ? (
        posts.map((item) => 
            <>
                <Fade triggerOnce direction="up">
                    <PostCard key={item.post_id} {...item} />
                </Fade>
            </>
        )
      ) : (
        <CircularProgress color="#81A094" />
      )}
    </div>
  );
}
