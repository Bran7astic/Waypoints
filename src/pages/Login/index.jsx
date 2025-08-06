import { Fade } from "react-awesome-reveal";
import LoginCard from "./LoginCard";

export default function Login() {
    return(
        <Fade direction="up" triggerOnce>
            <div>
                <h1>Login</h1>
                <LoginCard/>
            </div>
        </Fade>
    );
}