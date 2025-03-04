import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import socket from "../../config/socket";
import usePost from "../../hooks/usePost"; 

const CreateSession = () => {
  const router = useRouter(); 
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructorName: "",
    maxParticipants: "",
  });

  const { data, isLoading, error, postData } = usePost(
    `${process.env.NEXT_PUBLIC_STREAM_API_URL}/create-session`
  );

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCreateSession = async () => {
    if (!formData.title || !formData.instructorName) {
      alert("Please fill in all required fields.");
      return;
    }

    const sessionData = {
      ...formData,
      maxParticipants: formData.maxParticipants ? parseInt(formData.maxParticipants) : null,
      socketId: socket.id,
    };

    await postData(sessionData);

    if (!error) {
      router.push("/sessions/allSessions"); 
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl font-bold text-cyan-400 mb-6"> Create a New Session</h2>

      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <input 
            type="text" 
            id="title" 
            placeholder="Session Title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:border-cyan-400"
          />

          <input 
            type="text" 
            id="description" 
            placeholder="Session Description (Optional)" 
            value={formData.description} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:border-cyan-400"
          />

          <input 
            type="text" 
            id="instructorName" 
            placeholder="Instructor Name" 
            value={formData.instructorName} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:border-cyan-400"
          />

          <input 
            type="number" 
            id="maxParticipants" 
            placeholder="Max Participants (Optional)" 
            value={formData.maxParticipants} 
            onChange={handleChange} 
            className="w-full p-3 border border-gray-600 rounded-md bg-gray-900 text-white focus:border-cyan-400"
          />

          <button 
            onClick={handleCreateSession} 
            disabled={isLoading} 
            className={`w-full py-3 rounded-md font-semibold text-white transition-all ${
              isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {isLoading ? "Creating..." : "Create Session"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">Error: {error}</p>}
        {data && <p className="text-green-500 mt-4 text-center">✅ Session Created Successfully!</p>}
      </div>
    </div>
  );
};

export default CreateSession;
