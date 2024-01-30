import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Login from "./Pages/Login";
import Create from "./Pages/create_page";

function App() {

    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/*" element={<h2>404 not found</h2>} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;