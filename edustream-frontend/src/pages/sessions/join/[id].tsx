import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import socket from "../../../config/socket";
import usePost from "../../../hooks/usePost";
import useGet from "../../../hooks/useGet";

interface Member {
  id: string;
  name: string;
}

interface Session {
  id: string;
  title: string;
  instructorName: string;
  clients: Record<string, { socketId: string }>;
}

const JoinSession = () => {
  const router = useRouter();
  const { id: sessionId } = router.query;
  const [members, setMembers] = useState<Member[]>([]);

  const { data, isLoading, error, postData } = usePost<{ message: string; session: Session }>(
    `${process.env.NEXT_PUBLIC_STREAM_API_URL}/join`
  );

  const { data: sessionInfo, isLoading: isSessionLoading } = useGet<Session>(
    sessionId ? `${process.env.NEXT_PUBLIC_STREAM_API_URL}/session-info/${sessionId}` : ""
  );

  useEffect(() => {
    if (!sessionId) return;

    socket.connect();

    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id);
      socket.emit("registerSocket", { socketId: socket.id });

      postData({
        sessionId,
        socketId: socket.id,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  // Extract members from session.clients
  useEffect(() => {
    if (data?.session?.clients) {
      const extractedMembers = Object.keys(data.session.clients).map((clientId) => ({
        id: clientId,
        name: `User ${clientId}`, // You might need a proper name mapping if available
      }));
      setMembers(extractedMembers);
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      {/* Show session title instead of sessionId */}
      <h2 className="text-3xl font-bold text-cyan-400">
        {isSessionLoading ? "Loading..." : sessionInfo?.title || "Session"}
      </h2>
      <p className="text-gray-400 mt-1">
        👨‍🏫 {sessionInfo?.instructorName ? `Instructor: ${sessionInfo.instructorName}` : ""}
      </p>

      {/* Loading & Error Messages */}
      {isLoading && <p className="text-blue-400 mt-2">🔄 Joining session...</p>}
      {error && <p className="text-red-500 mt-2">❌ {error}</p>}
      {data && <p className="text-green-500 mt-2">✅ {data.message}</p>}

      {/* Members List */}
      <div className="mt-6 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-3">👥 Members in Session:</h3>
        <ul className="space-y-2">
          {members.length > 0 ? (
            members.map((member) => (
              <li key={member.id} className="p-2 bg-gray-700 rounded text-white text-sm flex items-center">
                <span className="mr-2">🔹</span> {member.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400">No members yet...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JoinSession;
