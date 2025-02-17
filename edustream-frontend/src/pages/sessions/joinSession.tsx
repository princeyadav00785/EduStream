import { useEffect, useState } from "react";
import socket from "../../config/socket";
import usePost from "../../hooks/usePost"; 

const JoinSession = () => {
    const [sessionId, setSessionId] = useState("");

    const { data, isLoading, error, postData } = usePost<{ message: string }>(
        `${process.env.NEXT_PUBLIC_STREAM_API_URL}/join`
    );

    useEffect(() => {
        socket.connect();

        socket.on("connect", () => {
            console.log("Connected with socket ID:", socket.id);
            socket.emit("registerSocket", { socketId: socket.id });
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleJoinSession = async () => {
        if (!sessionId) {
            alert("Please enter a session ID.");
            return;
        }

        const requestData = {
            sessionId,
            socketId: socket.id,
        };

        await postData(requestData);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
            <h2 className="text-4xl font-bold text-cyan-400 mb-6">🔗 Join a Session</h2>

            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                <input
                    type="text"
                    placeholder="Enter Session ID"
                    value={sessionId}
                    onChange={(e) => setSessionId(e.target.value)}
                    className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:border-cyan-400"
                />

                <button
                    onClick={handleJoinSession}
                    disabled={isLoading}
                    className={`w-full py-3 mt-4 rounded-md font-semibold text-white transition-all ${
                        isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"
                    }`}
                >
                    {isLoading ? "Joining..." : "Join Session"}
                </button>

                {/* Error Message */}
                {error && <p className="text-red-500 mt-4 text-center">⚠️ {error}</p>}

                {/* Success Message */}
                {data && <p className="text-green-500 mt-4 text-center">✅ {data.message}</p>}
            </div>
        </div>
    );
};

export default JoinSession;
