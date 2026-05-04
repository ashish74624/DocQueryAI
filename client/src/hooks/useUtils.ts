import { useNavigate } from "react-router-dom"

export const useUtils =()=>{
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("token");
        navigate("/")
    }

    return {logOut}
} 