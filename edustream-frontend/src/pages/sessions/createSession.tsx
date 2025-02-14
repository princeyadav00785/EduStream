import { useState, useEffect } from "react";
import axios from "axios";
import socket from "../../config/socket";

const CreateSession = () => {
    const [title, setTitle] = useState("");
    const [description,setDescription]=useState("");
    const [userId, setUserId] = useState("");

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Instructor connected with socket ID:", socket.id);
            socket.emit("registerSocket", { userId, socketId: socket.id });
        });

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const handleCreateSession = async () => {
        try {
            // if (title=="" || userId=="") {
            //     alert(`Enter a session title and ensure you're logged in. ${title} , ${description}`);
            //     return;
            // }

            const response = await axios.post("http://localhost:5003/api/session", {
                title,
                description,
                instructorId: userId,
                socketId: socket.id, 
            });

            console.log("Session Created:", response.data);
        } catch (error:any) {
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
            <button onClick={handleCreateSession}>Create Session</button>
        </div>
    );
};

export default CreateSession;
