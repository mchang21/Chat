import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    
    const { currentUser } = useContext(AuthContext);

    const ProtectedRoute = ({ children }: {children: ReactNode}) => {
        if (!currentUser) {
            return <Navigate to="/login" />
        }

        return children;
    }

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<ProtectedRoute><Home /></ProtectedRoute>}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default App
