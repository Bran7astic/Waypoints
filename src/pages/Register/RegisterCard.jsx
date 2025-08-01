import "@/styles/Auth.css";
import { supabase } from "../../client";
import { useContext, useEffect, useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function RegisterCard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { session } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const registerUser = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          emailRedirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) {console.error(error)}

      //   console.log("Data:", data);
      //   console.log("Error:", error);
      //   console.log("User ID:", data?.user?.id);
    };

    registerUser();
  };

  useEffect(() => {
    const addUser = async () => {
      const { error } = await supabase
        .from("Profiles")
        .insert({ username: username, user_id: session?.user.id });

      if (error) {
        console.error(error);
      }

      console.log("Inserted")

    };

    if (session) {
      navigate("/home");
      addUser();
    }
  }, [session]);

  return (
    <div className="authCard">
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>
      <p>
        Already have an account? <br />
        <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}
