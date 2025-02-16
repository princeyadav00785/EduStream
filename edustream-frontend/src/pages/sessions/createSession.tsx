import { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../config/socket";

const CreateSession = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [maxParticipants, setMaxParticipants] = useState("");

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Instructor connected with socket ID:", socket.id);
            socket.emit("registerSocket", { socketId: socket.id });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleCreateSession = async () => {
        try {
            // Validation
            if (title === "" || instructorName === "") {
                alert("Please fill in all required fields.");
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_STREAM_API_URL}/create-session`, {
                title,
                description,
                instructorName,
                maxParticipants: maxParticipants ? parseInt(maxParticipants) : null, 
                socketId: socket.id,
            });

            console.log("Session Created:", response.data);
        } catch (error: any) {
            console.error("Error creating session:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Create a Session</h2>
            <input
                type="text"
                placeholder="Enter Session Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Session Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Enter Instructor Name"
                value={instructorName}
                onChange={(e) => setInstructorName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter Max Participants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
            />
            <button onClick={handleCreateSession}>Create Session</button>
        </div>
    );
};

export default CreateSession;
