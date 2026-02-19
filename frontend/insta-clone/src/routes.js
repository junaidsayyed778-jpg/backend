import {BrowserRouter} from "react-router-dom";

export const routes = BrowserRouter([
    {
        path: "/login",
        element: <LoginForm/>
    },
    {
        path: "/register",
        element: <RegistrationForm/>
    }
])