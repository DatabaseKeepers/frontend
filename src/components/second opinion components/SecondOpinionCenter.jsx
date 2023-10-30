import React, { useEffect, useState} from "react"
import { useAuth } from "../../contexts/AuthContext";
import SecondOpinionSection from "./SecondOpinionSection";

function SecondOpinionCenter(){

    const [doctors, setDoctors] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        const API_URL = "https://dev-api.radiologyarchive.com";
        const idToken = user.accessToken;
        fetch(API_URL + "/api/user/radiologists" ,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${idToken}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)){
                    console.log("Response is an array:", data);
                }
                else{
                    console.log("Response is not an array:", data);
                }
                
                setDoctors(data.radiologists);
            })
            .catch((err) => console.error('Error fetching data:', err));
    },[]);

    return doctors && doctors.map((item, index) => {
        return (
            
            <SecondOpinionSection 
                key = {item.uid}
                    picture = {item.profile_image_url}
                    doctorAndTitle = {item.title + item.first_name + " " + item.last_name}
                    specialization = {item.expertise}
                    additionalText = {item.bio}
            />
            )
        })
            
        

    }
    
    
export default SecondOpinionCenter;