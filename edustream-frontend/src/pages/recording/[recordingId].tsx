"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RecordingStream: React.FC = () => {
  const { recordingId } = useParams<{ recordingId: string }>();
  const [recording, setRecording] = useState<{ url: string } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecording = async () => {
      try {
        const res = await fetch(`/api/recording/${recordingId}`);
        const data = await res.json();
        setRecording({ url: data.data.url });
      } catch (err) {
        console.error(err);
        setError("Error fetching recording details");
      }
    };
    if (recordingId) {
      fetchRecording();
    }
  }, [recordingId]);

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Recording: {recordingId}</h1>
      {error && <p className="text-red-500">{error}</p>}
      {recording ? (
        <video controls className="w-full max-w-4xl rounded shadow-lg">
          <source src={recording.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading recording...</p>
      )}
    </div>
  );
};

export default RecordingStream;
