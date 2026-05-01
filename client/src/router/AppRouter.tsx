
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Ask from "../Ask";
const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/login", element: <Login />
    },
    { path: "/register", element: <Register /> },
    { path: "/ask", element: <Ask /> },

])

export default router