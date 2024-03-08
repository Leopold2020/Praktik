import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Confirmation() {
    const navigate = useNavigate();

    useEffect(() => {
        const confirmAssignment = async () => {
            const token = window.location.pathname.split("/").pop();
            console.log(token);
            try {
                const response = await axios.get(`http://localhost:${process.env.REACT_APP_PORT || 5000}/confirm/${token}`, 
                {
                    headers: {
                        'Authorization': sessionStorage.getItem('accessToken')
                    },
                    
                }
                );

                alert(response.data);
                navigate("/"); // 
            } catch (error) {
                console.log(error);
                alert("Error confirming assignment");
                navigate("/"); //  
            }
        };
        confirmAssignment();
    }, [navigate]);

    return <div>Confirming assignment...</div>;
}

export default Confirmation;
