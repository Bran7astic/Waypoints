import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../client";
import "@/styles/details.css";
import UserContext from "../../contexts/UserContext";
import {
  CalendarMonth,
  Edit,
  Favorite,
  FavoriteBorderOutlined,
  LocationOn,
  SendRounded,
} from "@mui/icons-material";
import AuthContext from "../../contexts/AuthContext";
import EditIcon from "../../components/EditIcon";
import { CircularProgress } from "@mui/material";

export default function PostDetails() {
  const post_id = useParams().post_id;
  const { username, uid } = useContext(UserContext);
  const [details, setDetails] = useState(null);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    const getPostDetails = async () => {
      const { data, error } = await supabase
        .from("Posts")
        .select()
        .eq("post_id", post_id);

      error ? console.error(error) : setDetails(data[0]);
    };

    getPostDetails();
    fetchComments();
  }, [post_id]);

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("Comments")
      .select()
      .eq("post_id", post_id);

    error ? console.error(error) : setCommentsList(data);
  };

  const handleComment = () => {
    const postComment = async () => {
      const { data, error } = await supabase.from("Comments").insert({
        text: comment,
        post_id: post_id,
        user_id: uid,
        username: username,
      });

      error ? console.error(error) : fetchComments();
    };

    postComment();
    setComment("");
  };

  useEffect(() => {
    console.log(commentsList);
  }, [commentsList]);

  const getDate = () => {
    if (details) {
      const date = new Date(details?.created_at);
      return date.toLocaleDateString();
    }
  };

  return (
    <>
      {details ? (
        <div className="detailsContainer">
          <>
            <div className="details">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.2em",
                }}
              >
                <LocationOn />
                <h2>{details.location}</h2>
              </div>

              <img className="detailImg" src={details.imageUrl} />
              <p className="caption">
                <b>{username}:</b> {details.caption}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <div className="iconContainer">
                  <CalendarMonth />
                  <p>{getDate()}</p>
                </div>

                {uid === details.user_id && (
                  <div className="iconContainer">
                    <EditIcon post_id={details.post_id} />
                  </div>
                )}

                <div className="iconContainer">
                  <Favorite />
                  <p>{details.likes}</p>
                </div>
              </div>
            </div>

            <div className="details">
              <div className="comments">
                {commentsList.length > 0 ? (
                  commentsList.map((item) => (
                    <p>
                      <b>{item.username}:</b> {item.text}
                    </p>
                  ))
                ) : (
                  <p style={{ margin: "0 auto" }}>No comments yet!</p>
                )}
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="commentBox"
              />
              <SendRounded
                onClick={handleComment}
                style={{
                  cursor: "pointer",
                  position: "absolute",
                  bottom: "10",
                  right: "2.7em",
                }}
              />
            </div>
          </>
        </div>
      ) : (
        <CircularProgress color="#81A094" />
      )}
    </>
  );
}
