import "@/styles/NavBar.css";
import { Link } from "react-router-dom";
import { supabase } from "../../client";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";
import LogoutButton from "../../components/LogoutButton";

export default function NavBar() {
  const { username, uid } = useContext(UserContext);

  return (
    <div className="navBar">

      <div style={{width: "10%"}}> 
      <Link className="navLink" to="/home/post">
        <h3>Post</h3>
      </Link>
      </div>

     <div style={{width: "10%"}}>
      <Link className="navLink" to="/home">
        <h2>Waypoints</h2>
      </Link>
     </div>

     <div style={{width: "10%"}}>
      <Link className="navLink" to={`/home/profile/${username}`}>
        <h3>{username}</h3>
      </Link>
           </div>

    </div>
  );
}
