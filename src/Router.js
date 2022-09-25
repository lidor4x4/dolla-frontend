import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home"
import Login from "./components/login/Login";
import Register from "./components/register/Register";


function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home />}/>
                    <Route path="/accounts/register" exact element={<Register />}/>
                    <Route path="/accounts/login" exact element={<Login />}/>

                </Routes>
            </BrowserRouter>
        </>
    );
}
export default Router;