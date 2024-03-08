import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import Header from "./Components/Header.js";
import Home from "./Pages/public_access/Home.js";
import MatchInfo from "./Pages/public_access/matchInfo.js";
import Login from "./Pages/Login.js";
import Create from "./Pages/create_page.js";
import Overview from "./Pages/overview.js";
import MatchViewer from "./Pages/matchViewer.js";
import AssignRefPage from "./Pages/assignref.js";
import ViewAssignments from "./Pages/viewassignments.js";
import Confirmation from "./confirmation.js";

function App() {
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        refreshToken();
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    async function refreshToken() {
        try {
            const response = await axios.post(`http://localhost:${process.env.REACT_APP_PORT || 5000}/account/refresh`, { 
                accessToken: sessionStorage.getItem("accessToken")
            });
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
                default:
                    alert("Something went wrong");
                    break;
            }
        } catch (error) {
            alert("You need to login");
        }
    }

    return (
        <HelmetProvider>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/match/info/:matchId" element={<MatchInfo />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/create" element={<Create axiosJWT={axiosJWT} />} />
                    <Route path="/overview" element={<Overview axiosJWT={axiosJWT} />} />
                    <Route path="/assignref" element={<AssignRefPage axiosJWT={axiosJWT} />} />
                    <Route path="/matchviewer/:matchId" element={<MatchViewer axiosJWT={axiosJWT} />} />
                    <Route path="/viewassignments" element={<ViewAssignments axiosJWT={axiosJWT} />} />
                    <Route path="/confirm/:token" element={<Confirmation />} />
                    <Route path="/*" element={<h2>404 not found</h2>} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;
