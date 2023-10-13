import DashboardSection from "./DashboardSection"
import React from "react"

export default function PortalCenter() {
    const data = {
        physician: [
            {
                title: "View Your List of Patients!",
                description: "Have Easy Access to all your patients through our web service.",
                btnText: "View Patient List",
                btnLink: "/patientlist"
            },
            {
                title: "Have a New Patient?",
                description: "Easily add a new patient by inputting their necessary information to start uploading their medical scans.",
                btnText: "Add Patient",
                btnLink: "/addpatient"
            },
            {
                title: "Upload Your Patient's Medical Images!",
                description: "Upload your Patient's medical image along with your notes quick and easy.",
                btnText: "Upload Image",
                btnLink: "/upload"
            },
        ],
        patient: [
            {
                title: "See Your Medical Images!",
                description: "Your physician will send you a digital copy of your medical scan through our web service! They will also leave notes attached to the image for your convenience to better understand your health. ",
                btnText: "View Medical Images",
                btnLink: "/images"
            },
            {
                title: "Want a Second Opinion?",
                description: "If you want a better understanding of your medical image, we provide a wide selection of radiologists for you! All you need to is select the radiologist that is right for you and they’ll be on their way to interpret your chosen image!",
                btnText: "Get Second Opinion",
                btnLink: "/secondopinion"
            },
        ],
        radiologist: [
            {
                title: "Add More to Your Profile!",
                description: "If you haven’t already, be sure to add a bio and picture to your profile to let patients know that you are the right radiologist for them!",
                btnText: "View Profile",
                btnLink: "/profile"
            },
            {
                title: "Check Notifications!",
                description: "You will get a notification from a patient who requests a second opinion from you!",
                btnText: "View Notifications",
                btnLink: "/notifications"
            },
        ]
    }

    return(
    data.patient.map((item, index)=>{
        return <DashboardSection key={index} isLast={item===data.patient[data.patient.length-1]} headerDescription={item.title} paragraphDescription={item.description} buttonDescription={item.btnText} buttonLink={item.btnLink}/>

    }))

}
