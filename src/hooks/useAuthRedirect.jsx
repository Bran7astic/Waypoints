import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function useAuthRedirect(redirectPath = "/") {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if (!user) {
            navigate(redirectPath)
        }
    }, [user, navigate, redirectPath])
}