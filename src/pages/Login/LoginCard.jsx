import "@/styles/Auth.css"
import { useState } from "react";
import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";

export default function LoginCard() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = () => {
    const loginUser = async() => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        console.log("Data:", data)

        if(error) {
            console.error(error)
            setError(error)
        }

        if (data.session) {navigate('/home')}
    }

    loginUser()

  }

  return (
    <div className="authCard">
      <input
        style={{borderColor: error ? "red" : "black"}}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{borderColor: error ? "red" : "black"}}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    
      {error && (
        <p style={{color: "red", lineHeight: "0.2"}}>Invalid Credentials</p>
      )}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
