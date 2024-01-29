import { createBrowserRouter } from "react-router-dom";
import React from "react";

import App from "./App";
import CreatePage from "./create_page";

const router = createBrowserRouter ([
    {path: "/view", element: <App />},
    {path: "/create", element: <CreatePage />},

    
]);

export default router;


