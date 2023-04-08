import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// page
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/todo" element={<Todo />} />
                </Routes>
            </Router>
        </div>
    );
}
