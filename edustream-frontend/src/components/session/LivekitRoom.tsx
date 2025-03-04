"use client";
import { useState, useEffect } from "react";
import { LiveKitRoom,
     VideoConference, 
     } from "@livekit/components-react";
import "@livekit/components-styles"; 
import ChatListner from "./ChatListener";
import RecordingControl from "../recording/RecordingControl";

interface LiveKitRoomProps {
  userId: string;
  sessionId: string;
}

const LiveKitRoomComponent: React.FC<LiveKitRoomProps> = ({ userId, sessionId }) => {
  const [token, setToken] = useState<string | null>(null);
  const [sessionName, setSessionName]=useState("");
  const [roomName,setRoomName]=useState("");
  const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://localhost:7880";
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("http://localhost:5003/api/session/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" , Authorization: authToken ? `Bearer ${authToken}` : "",},
          body: JSON.stringify({ userId, sessionId ,"socketId": "sampleid"}),
        });

        const data = await response.json();
        if (data.session.token) setToken(data.session.token);
        if (data.session.session.title) setSessionName(data.session.session.title);
        if(data.session.session.id)setRoomName(data.session.session.id);
      } catch (error) {
        console.error("Error fetching LiveKit token:", error);
      }
    };

    fetchToken();
  }, [userId, sessionId]);

  if (!token) return <p>Loading session...</p>;

  return (
    <LiveKitRoom serverUrl={LIVEKIT_URL} token={token} connect={true}>
     <VideoConference className="lk-video-conference" />
     {/* <ChatListner/> */}
     <RecordingControl sessionId={sessionId} sessionName={sessionName} roomName={roomName}/>
    </LiveKitRoom>
  );
};

export default LiveKitRoomComponent;
