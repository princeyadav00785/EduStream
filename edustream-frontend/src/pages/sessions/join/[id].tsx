import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import socket from "../../../config/socket";

interface Member {
  id: string;
  name: string;
}

const JoinSession = () => {
  const router = useRouter();
  const { id: sessionId } = router.query;
  const [members, setMembers] = useState<Member[]>([]);
  const [userId, setUserId] = useState<string>("user-123"); 

  useEffect(() => {
    if (!sessionId) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
      socket.emit("registerSocket", { userId, socketId: socket.id });

      axios
        .post(`${process.env.NEXT_PUBLIC_STREAM_API_URL}/session/join`, {
          sessionId,
          userId,
          socketId: socket.id,
        })
        .then(() => console.log("Joined session"))
        .catch((error) => console.error("Error joining session:", error));
    });

    socket.on("updateMembers", (updatedMembers: Member[]) => {
      setMembers(updatedMembers);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId, userId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Session {sessionId}</h2>
      <h3 className="text-xl mt-4">Members in Session:</h3>
      <ul className="mt-2 space-y-2">
        {members.map((member) => (
          <li key={member.id} className="p-2 border rounded">
            {member.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JoinSession;
