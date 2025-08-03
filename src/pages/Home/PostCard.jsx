import "@/styles/PostCard.css";
import {
  CalendarMonth,
  Favorite,
  FavoriteBorder,
  LocationOn,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import useGetUsername from "../../hooks/useGetUsername";

export default function PostCard({
  post_id,
  caption,
  created_at,
  imageUrl,
  location,
  likes,
  user_id,
}) {
  const fetchedUsername = useGetUsername(user_id);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesState, setLikesState] = useState(likes);

  useEffect(() => {
    // const getUsername = async () => {
    //     const {data, error} = await supabase
    //         .from('Profiles')
    //         .select('username')
    //         .eq('user_id', user_id)

    //     error ? console.error(error) : setUsername(data[0].username)
    // }

    // getUsername()

    getDate();
  }, []);

  useEffect(() => {
    console.log("Fetched username:", fetchedUsername);
    setUsername(fetchedUsername);
  }, [fetchedUsername]);

  const getDate = () => {
    const date = new Date(created_at);

    return date.toLocaleDateString();
  };

  const handleLike = () => {
    setLiked(true);
    setLikesState((prev) => prev + 1);
  };

  const handleUnlike = () => {
    setLiked(false);
    setLikesState((prev) => prev - 1);
  };

  useEffect(() => {
    const updateLikes = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .update({ likes: likesState })
        .eq("post_id", post_id);

      error ? console.error(error) : console.log(data);
    };

    updateLikes();
  }, [likesState]);

  return (
    <div className="postCard">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.2em",
        }}
      >
        <LocationOn />
        <h3>{location}</h3>
      </div>

      <div
        style={{
          width: "100%",
          height: "20em",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          src={imageUrl}
          onClick={() => navigate(`/home/${post_id}`)}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignContent: "flex-start",
        }}
      >
        <p style={{ textAlign: "left" }}>
          <b>{username}:</b> {caption}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.2em" }}>
          <CalendarMonth />
          <p>{getDate()}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.2em" }}>
          {liked ? (
            <Favorite />
          ) : (
            <FavoriteBorder />
          )}
          <p>{likesState}</p>
        </div>
      </div>
    </div>
  );
}
