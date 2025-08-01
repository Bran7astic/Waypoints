import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

export default function useAuthRedirect(redirectPath = "/") {
    const { user, loading } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
        if (!loading && !user) {
            navigate(redirectPath)
        }
    }, [user, loading, navigate, redirectPath])
}