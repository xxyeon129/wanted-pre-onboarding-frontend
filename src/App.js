import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

// pages
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

export default function App() {
    // 로그인 여부 상태
    const [isLogin, setIsLogin] = useState(false);

    // 로그인 여부 판별
    useEffect(() => {
        if (window.localStorage.getItem("loginToken")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, []);

    return (
        <div>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            isLogin ? (
                                <Navigate to="/todo" />
                            ) : (
                                <Navigate to="/signin" />
                            )
                        }
                    />
                    <Route
                        path="/signin"
                        element={
                            isLogin ? (
                                <Navigate replace to={"/todo"} />
                            ) : (
                                <Signin />
                            )
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            isLogin ? (
                                <Navigate replace to={"/todo"} />
                            ) : (
                                <Signup />
                            )
                        }
                    />
                    <Route
                        path="/todo"
                        element={
                            isLogin ? (
                                <Todo />
                            ) : (
                                <Navigate replace to={"/signin"} />
                            )
                        }
                    />
                </Routes>
            </Router>
        </div>
    );
}
