import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";

import Login from "./Pages/Login";
import Create from "./Pages/create_page";
import MatchOverview from "./Pages/matchOverview";
import MatchViewer from "./Pages/matchViewer";

function App() {

    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        refreshToken()
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    async function refreshToken() {
        try {
            await axios.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/account/refresh`, { 
            accessToken: sessionStorage.getItem("accessToken")
            }).then((response) => {
                switch (response.status) {
                    case 200:
                        sessionStorage.setItem("accessToken", response.data.accessToken);
                        break;
                    case 401:
                        alert("Unauthorized");
                        break;
                    case 403:
                        alert("Forbidden");
                        break;
                    case undefined:
                        alert("You need to login first");
                        break;
                    default:
                        alert("Something went wrong");
                        break;
                }
            });
        } catch (error) {
        alert("You need to login")
        }
    }

    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<Create axiosJWT={axiosJWT} />} />
                    <Route path="/matchoverview" element={<MatchOverview axiosJWT={axiosJWT} />} />
                    <Route path="/matchviewer/:matchId" element={<MatchViewer axiosJWT={axiosJWT} />} />
                    <Route path="/*" element={<h2>404 not found</h2>} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;