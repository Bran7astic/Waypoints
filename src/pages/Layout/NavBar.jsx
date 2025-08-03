import "@/styles/NavBar.css";
import { Link } from "react-router-dom";
import { supabase } from "../../client";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import UserContext from "../../contexts/UserContext";

export default function NavBar() {

  const { username } = useContext(UserContext)


  const handleLogout = () => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) console.log(error);
    };

    logout();
  };

  return (
    <div className="navBar">

      <div style={{ backgroundColor: "red", width: "30%" }}>
        <Link to="/home">
          <h2>Waypoints</h2>
        </Link>
      </div>

      <div style={{ backgroundColor: "green", width: "30%" }}>
        <input />
      </div>

      <div style={{ backgroundColor: "blue", width: "30%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to="/home/post">
          <h3>Post</h3>
        </Link>
        <h3>
          {username}
        </h3>
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
