import { useEffect, useState } from "react";
import axios from "axios";
import socket from "../../config/socket";

const JoinSession = () => {
    const [sessionId, setSessionId] = useState("");
    const [userId, setUserId] = useState(""); 

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Connected with socket ID:", socket.id);
            socket.emit("registerSocket", { userId, socketId: socket.id });
        });

        return () => {
            socket.disconnect(); 
        };
    }, [userId]);

    const handleJoinSession = async () => {
        try {
            if (!userId || !sessionId) {
                alert("Please enter a session ID and ensure you're logged in.");
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_STREAM_API_URL}/join`, {
                sessionId,
                userId,
                socketId: socket.id, 
            });

            console.log("Joined session:", response.data);
        } catch (error:any) {
            console.error("Error joining session:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Join a Session</h2>
            <input
                type="text"
                placeholder="Enter Session ID"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
            />
            <button onClick={handleJoinSession}>Join Session</button>
        </div>
    );
};

export default JoinSession;
