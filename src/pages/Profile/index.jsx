import { useParams } from "react-router-dom";

export default function Profile() {

    const user_id = useParams().user_id

    return(
        <div>
            <h1>Profile for {user_id}</h1>
        </div>
    );
}