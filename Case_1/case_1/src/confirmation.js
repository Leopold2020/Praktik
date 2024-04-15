import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Confirmation() {
    const navigate = useNavigate();

    useEffect(() => {
        const confirmAssignment = async () => {
            const etoken = window.location.pathname.split("/").pop(); // Extract the confirmation token from the URL
            sessionStorage.setItem("confirmationToken", etoken); // Store the confirmation token

            const token = sessionStorage.getItem("confirmationToken"); // Retrieve the confirmation token
            console.log(token);
            if (!token) {
                alert("Confirmation token not found. Please log in again."); // Notify user to log in again if confirmation token is missing
                navigate("/login-confirm"); // Redirect user to login page
                return;
            }
            
            try {
                const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT || 5000}/confirm/${token}`, {}, {
                    headers: {
                        'Authorization': sessionStorage.getItem('accessToken')
                    }
                });
                alert(response.data.message);
                navigate("/"); // Redirect to home page after confirmation
            } catch (error) {
                console.log(error);
                alert("Error confirming assignment");
                navigate("/login-confirm"); 
            }
        };
        confirmAssignment();
    }, [navigate]);

    return <div>Confirming assignment...</div>;
}

export default Confirmation;


