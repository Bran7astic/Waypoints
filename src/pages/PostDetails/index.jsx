import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../client";
import "@/styles/details.css"
import UserContext from "../../contexts/UserContext";
import { CalendarMonth, Edit, FavoriteBorderOutlined } from "@mui/icons-material";
import AuthContext from "../../contexts/AuthContext";
import EditIcon from "../../components/EditIcon";
import { CircularProgress } from "@mui/material";

export default function PostDetails() {

    const navigate = useNavigate()
    const id = useParams().post_id
    const { username, uid } = useContext(UserContext)
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

    }, [id])

    const getDate = () => {
        if (details) {
            const date = new Date(details?.created_at)
            return date.toLocaleDateString()
        }
    }


    return (
        <div className="detailsContainer">
            {details ? (
                <div className="details">

                    <h2>{details.location}</h2>
                    <img className="detailImg" src={details.imageUrl}/>
                    <p className="caption">
                        <b>{username}:</b> {details.caption}
                    </p>

                    <div style={{display: "flex", justifyContent: "space-evenly", width: "100%"}}> 
                        <div className="iconContainer">
                            <CalendarMonth/>
                            <p>{getDate()}</p>
                        </div>

                        {uid === details.user_id && (
                            <div className="iconContainer">
                                <EditIcon post_id={details.post_id}/>
                            </div>
                        )}

                        <div className="iconContainer">
                            <FavoriteBorderOutlined/>
                            <p>{details.likes}</p>
                        </div>

                    </div>

                </div>
            ) : (
                <CircularProgress color="#81A094"/>
            )}

            <div className="details">
                <div className="comments">
                    <p>Test commment</p>
                    <p>Test commment</p>
                    <p>Test commment</p>
                    <p>Test commment</p>
                </div>
                <textarea className="commentBox"/>
            </div>
        </div>
    );
}