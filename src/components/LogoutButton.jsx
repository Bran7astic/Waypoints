import { supabase } from "../client";

export default function LogoutButton() {
    
  const handleLogout = () => {
    const logout = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) console.log(error);
    };

    logout();
  };

    return(
        <button className="logoutButton" onClick={handleLogout}>
          Logout
        </button>
    )
}