import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Confirmation() {
    const navigate = useNavigate();

    useEffect(() => {
        const confirmAssignment = async () => {
            const token = window.location.pathname.split("/").pop();
            try {
                const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT || 5000}/confirm/${token}`);
                alert(response.data);
                navigate("/"); // Redirect to home after confirmation
            } catch (error) {
                alert("Error confirming assignment");
                navigate("/"); // Redirect to home in case of error
            }
        };
        confirmAssignment();
    }, [navigate]);

    return <div>Confirming assignment...</div>;
}

export default Confirmation;
