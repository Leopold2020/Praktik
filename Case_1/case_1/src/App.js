import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import UnifiedHeader from "./Components/headers/unifedHeader.js";
import Login from "./Pages/Login.js";
import Home from "./Pages/publicAccess/Home.js";
import MatchInfo from "./Pages/publicAccess/matchInfo.js";
import PersonalAssignment from "./Pages/personalAssignment.js";
import RefereeHomepage from "./Pages/refereeAccess/refereeHomepage.js";
import CoachHomepage from "./Pages/coachAccess/coachHomepage.js";
import CoachMatchReview from "./Pages/coachAccess/coachMatchReview.js";
import Create from "./Pages/adminAccess/create_page.js";
import Overview from "./Pages/adminAccess/overview.js";
import MatchEdit from "./Pages/adminAccess/matchEdit.js";
// import MatchOverview from "./Pages/matchOverview.js";
// import MatchViewer from "./Pages/matchViewer.js";
// import AssignmentPage from "./Pages/assignment/chooseAssignment.js";
// import AssignRefPage from "./Pages/assignref.js";
import "./App.css";

import Mymatch from "./Pages/mymatches.js";
import ExcelToJsonConverter from "./Pages/excelconvert.js";
function App() {
    const [role, setRole] = useState("public");

    /*
    * Axios instance with interceptor to refresh token
    * This is an interceptor that will only run if the request is made 
    * with the axiosJWT instance
    * uses axios.create() to create a new instance of axios
    * and then uses the built-in function "interceptors" to add a call to the
    * refreshToken function
    */
    const axiosJWT = axios.create();
    axiosJWT.interceptors.request.use(async (config) => {
        refreshToken()
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    /*
    * Function to refresh the token
    * This function sends a POST request to the server to refresh the token
    * to keep the user logged in. It uses the accessToken from the sessionStorage
    * and then updates the sessionStorage with the new token
    * if the request is successful
    * if the request is unsuccessful, it will alert the user
    * @returns {void}
    * @throws {error} - if the request is unsuccessful
    * @throws {error} - if the user is not logged in
    * @throws {error} - if the user is unauthorized
    * @throws {error} - if the user is forbidden
    * @throws {error} - if something went wrong
    */
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

    function roleChangeHandler(new_role) {
        setRole(new_role);
    }

    function encryptMessage(message) {

    }

    async function decryptMessage(message) {

    }

    useEffect(() => {
        let sessionRole = sessionStorage.getItem("role");
        if (sessionRole !== null) {
            roleChangeHandler(sessionStorage.getItem("role"));
        }
    }, []);

    return (
        <HelmetProvider>
            <BrowserRouter>
                <UnifiedHeader role={role} />
                <div className="universal-div">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/match/info/:matchId" element={<MatchInfo />} />
                    <Route path="/login" element={<Login roleChange={roleChangeHandler} />} />
                    {/* <Route path="/assignment" element={<AssignRefPage axiosJWT={axiosJWT} />} /> */}
                    {/* <Route path="/assignref" element={<AssignRefPage axiosJWT={axiosJWT} />} /> */}
                    {/* <Route path="/matchoverview" element={<MatchOverview axiosJWT={axiosJWT} />} /> */}
                    {/* <Route path="/matchviewer/:matchId" element={<MatchViewer axiosJWT={axiosJWT} />} /> */}
                    <Route path="/personalassignment" element={<PersonalAssignment axiosJWT={axiosJWT} />} />
                    <Route path="/referee/homepage" element={<RefereeHomepage axiosJWT={axiosJWT} />} />
                    <Route path="/coach/homepage" element={<CoachHomepage axiosJWT={axiosJWT} />} />
                    <Route path="/coach/matchreview/:matchId" element={<CoachMatchReview axiosJWT={axiosJWT} />} />
                    <Route path="/create" element={<Create axiosJWT={axiosJWT} />} />
                    <Route path="/overview" element={<Overview axiosJWT={axiosJWT} />} />
                    <Route path="/matchedit/:matchId" element={<MatchEdit axiosJWT={axiosJWT} />} />
                    <Route path="/mymatches" element={<Mymatch axiosJWT={axiosJWT} />} />
                    <Route path="/*" element={<h2>404 not found</h2>} />
                    <Route path="/excelconvert" element={<ExcelToJsonConverter />} />
                </Routes>
                </div>
            </BrowserRouter>
        </HelmetProvider>
    );
};

export default App;
