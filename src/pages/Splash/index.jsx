import "@/styles/Splash.css";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  return (
    <Fade direction="up" triggerOnce>
      <div className="splash">
        <h1>Waypoints</h1>
        <h2>Mapping the best spots, no matter how far.</h2>
        <p style={{ width: "80%" }}>
          Waypoints is an image sharing platform where users must tag where they
          took each photo they post. All the best scenery, vacation, and hangout
          spots consolidated into one feed. No gatekeeping allowed!
        </p>

        <div style={{ display: "flex", gap: "2em", margin: "1em" }}>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      </div>
    </Fade>
  );
}
