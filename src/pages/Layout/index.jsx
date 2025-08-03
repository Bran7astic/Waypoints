import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() {
    return(
        <div>
            <NavBar/>
            <div style={{marginTop: "10%"}}>
                <Outlet/>
            </div>
        </div>
    );
}