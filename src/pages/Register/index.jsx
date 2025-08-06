import { useContext, useEffect } from "react";
import RegisterCard from "./RegisterCard";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

export default function Register() {
  return (
    <Fade direction="up" triggerOnce>
      <div>
        <h1>Register</h1>
        <RegisterCard />
      </div>
    </Fade>
  );
}
