import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import useAuthRedirect from "../../hooks/useAuthRedirect";

export default function Layout() {

    useAuthRedirect("/")

    return(
        <div>
            <NavBar/>
            <div style={{marginTop: "10%"}}>
                <Outlet/>
            </div>
        </div>
    );
}