import { Link } from "react-router-dom";

export default function App() {


    // const loadUser =
    //     async () => {
    //         const token = getToken();

    //         if (!token) return;

    //         const res = await api.request("/me");

    //         if (res.detail) {
    //             localStorage.removeItem("token");
    //             return;
    //         }

    //         setUser(res);
    //     };


    return (
        <>
            <Link to={'/login'}>Login</Link>
        </>
    );
}