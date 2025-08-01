import "@/styles/Auth.css";
import { supabase } from "../../client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterCard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    const registerUser = async () => {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${window.location.origin}/feed`
        }
      });

    //   console.log("Data:", data);
    //   console.log("Error:", error);
    //   console.log("User ID:", data?.user?.id);

    };

    registerUser();
  };

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
        Already have an account? <br/>
        <Link to="/login">
            Log In
        </Link>
      </p>
    </div>
  );
}
