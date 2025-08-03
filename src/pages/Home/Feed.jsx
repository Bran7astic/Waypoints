import { useEffect, useState } from "react";
import { supabase } from "../../client";
import PostCard from "./PostCard";
import "@/styles/Feed.css";
import { CircularProgress } from "@mui/material";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: false });

      error ? console.error(error) : setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return (
    <div>
      <div className="feedContainer">
        {posts ? (
          posts.map((item) => <PostCard key={item.post_id} {...item} />)
        ) : (
          <CircularProgress/>
        )}
      </div>
    </div>
  );
}
