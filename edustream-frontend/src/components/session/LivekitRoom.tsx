"use client";
import { useState, useEffect } from "react";
import { LiveKitRoom,
     VideoConference, 
     } from "@livekit/components-react";
import "@livekit/components-styles"; 
import ChatListner from "./ChatListener";
import RecordingControl from "../recording/RecordingControl";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface LiveKitRoomProps {
  userId: string;
  sessionId: string;
  userName: string|undefined;
}

const LiveKitRoomComponent: React.FC<LiveKitRoomProps> = ({ userId, sessionId ,userName}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  let userRole:string ="STUDENT";
  if (userInfo != null) {
    userRole = userInfo.role;
  }
  const [token, setToken] = useState<string | null>(null);
  const [sessionName, setSessionName]=useState("");
  const [roomName,setRoomName]=useState("");
  const LIVEKIT_URL = process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://localhost:7880";
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const socketId= localStorage.getItem("socketId");
        const response = await fetch("http://localhost:5003/api/session/join", {
          method: "POST",
          headers: { "Content-Type": "application/json" , Authorization: authToken ? `Bearer ${authToken}` : "",},
          body: JSON.stringify({userName, userId, sessionId ,"socketId": socketId}),
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
   <div className="my-10 min-h-[50vh]">
     <LiveKitRoom serverUrl={LIVEKIT_URL} token={token} connect={true}>
     <VideoConference className="lk-video-conference" />
     {/* <ChatListner/> */}
    <div className="absolute top-10 left-0 lg:left-10">

    {userRole!=="STUDENT"&& <RecordingControl sessionId={sessionId} sessionName={sessionName} roomName={roomName}/>}
    </div>
    </LiveKitRoom>
   </div>
  );
};

export default LiveKitRoomComponent;
