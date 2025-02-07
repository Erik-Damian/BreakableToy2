'use client'

import React, { useEffect, useState } from 'react'

interface LoadingScreenProps {
    type : "price" | "duration",
}

//This component is a visual flare with fun quotes to keep the user invested. The statements might not be accurate to what is actually happening.
export default function LoadingScreen({type}: LoadingScreenProps) {
    const messages = [ [
            "Finding the best deals",
            "Finding best bang for your buck",
            "Keeping your wallet safe",
            "Looking for the most affordable deals",
            "Negotiating prices",
            "Loading the best prices",
            "In for a penny, in for a flight"
        ],
        [
            "Speeding up flights",
            "Racing airlines",
            "Looking for the fastest around",
            "Searching for the quickest options",
            "Keeping your time and money",
            "Loading the shortest flights",
            "The quick plane flew over the lazy chopper"
        ]
    ]
    const [randomMessage, setRandomMessage] = useState("");
    const [dots, setDots] = useState(".");

    function getRandomMessage() {
        const pool = type === "price" ? messages[0] : messages[1];
        const randomIndex = Math.floor(Math.random() * pool.length);
        return pool[randomIndex];
    }

    function changeText(){
        if(dots.length >=3){
            setDots("");
        }
        else{
            setDots(dots+".");
        }
    }

    useEffect(() => {
        setRandomMessage(getRandomMessage());
    }, [type]);

    useEffect(() =>{
        setTimeout(changeText, 400)
    },[dots])

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/50 z-50">
            <h2 className="text-white text-2xl font-bold">{randomMessage}{dots}</h2>
        </div>
    );
}
