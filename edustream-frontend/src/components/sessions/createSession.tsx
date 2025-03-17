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

  const [errors, setErrors] = useState({
    title: false,
    instructorName: false,
  });

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("Instructor connected with socket ID:", socket.id);
      socket.emit("registerSocket", { socketId: socket.id });
      const socketId = localStorage.getItem("socketId");
      if (socket.id && !socketId) {
        localStorage.setItem("socketId", socket.id);
      }
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
    const newErrors = {
      title: !formData.title,
      instructorName: !formData.instructorName,
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.instructorName) {
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">🎯 Create New Session</h2>

      <div className="w-full max-w-xl bg-white p-8 rounded-xl shadow-md border border-gray-200">

        <div className="space-y-6">

          {/* Session Title */}
          <input
            type="text"
            id="title"
            placeholder="Session Title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full p-4 rounded-md border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">⚠️ Title is required.</p>
          )}

          {/* Session Description */}
          <input
            type="text"
            id="description"
            placeholder="Session Description (Optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Instructor Name */}
          <input
            type="text"
            id="instructorName"
            placeholder="Instructor Name"
            value={formData.instructorName}
            onChange={handleChange}
            className={`w-full p-4 rounded-md border ${
              errors.instructorName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-cyan-400`}
          />
          {errors.instructorName && (
            <p className="text-red-500 text-sm">⚠️ Instructor name is required.</p>
          )}

          {/* Max Participants */}
          <input
            type="number"
            id="maxParticipants"
            placeholder="Max Participants (Optional)"
            value={formData.maxParticipants}
            onChange={handleChange}
            className="w-full p-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          {/* Create Session Button */}
          <button
            onClick={handleCreateSession}
            disabled={isLoading}
            className={`w-full py-3 rounded-md font-semibold text-white transition-all ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {isLoading ? "Creating Session..." : "Create Session"}
          </button>
        </div>

        {/* Error Handling */}
        {error && <p className="text-red-500 mt-4 text-center">❌ {error}</p>}

        {/* Success Message */}
        {data && (
          <p className="text-green-500 mt-4 text-center">
            ✅ Session Created Successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateSession;
