import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import Test from "./Test";

function Routers () {
    return (
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/test" element={<Test />} />
            </Routes>
    );
}

export default Routers;