import "@/styles/Auth.css";
import { supabase } from "../../client";
import { useContext, useEffect, useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

export default function RegisterCard() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false)
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
      setSubmitted(true)

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
      {submitted && (
        <p>Please confirm your email {email} to log in.</p>
      )}
      <p>
        Already have an account? <br />
        <Link className="loginLink" to="/login">Log In</Link>
      </p>
    </div>
  );
}
