import { useState } from "react";
import useGet from "@/hooks/useGet";

interface Recording {
  id: string;
  sessionName: string;
  roomName: string;
  s3Key: string;
  duration?: number;
  createdAt: string;
  description?:string,
  instructorName?: string,
}

interface RecordingsResponse {
  success: boolean;
  recordings: Recording[];
}

interface StreamResponse {
  success: boolean;
  url: string;
}

const RecordingsList = () => {
  const { data, isLoading, error } = useGet<RecordingsResponse>(
    `${process.env.NEXT_PUBLIC_STREAM_API_URL}/recording/list`
  );
  const [selectedRecording, setSelectedRecording] = useState<string | null>(null);

  const streamApiUrl = selectedRecording
  ? `${process.env.NEXT_PUBLIC_STREAM_API_URL}/recording/stream/${selectedRecording}`
  : "";

const { data: streamData, isLoading: isStreamLoading, error: streamError } =
  useGet<StreamResponse>(streamApiUrl);


  if (isLoading) return <p className="text-center text-gray-500">Loading recordings...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
    {/* Page Heading */}
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Available Recordings
    </h1>
  
    {/* Recording List */}
    {data?.recordings && data.recordings.length > 0 ? (
      <ul className="space-y-4">
        {data.recordings.map((recording) => (
          <li
            key={recording.id}
            className="p-5 bg-white shadow-md rounded-xl flex justify-between items-center border border-gray-200 transition hover:shadow-lg"
          >
            {/* Recording Info */}
            <div className="flex-1">
              <p className="text-lg font-semibold text-gray-900">
                {recording.sessionName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Instructor:</span> {recording?.instructorName || "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {recording?.description || "No description available"}
              </p>
            </div>
  
            {/* Play Button */}
            <button
              onClick={() => setSelectedRecording(recording.id)}
              className="bg-blue-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-blue-600 transition"
            >
              ▶ Play
            </button>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-500">No recordings available.</p>
    )}
  
    {/* Video Player Section */}
    {selectedRecording && (
      <div className="mt-12 p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Now Playing</h2>
  
        {isStreamLoading ? (
          <p className="text-center text-gray-500">Loading stream...</p>
        ) : streamError ? (
          <p className="text-center text-red-500">
            Error loading stream: {streamError}
          </p>
        ) : (
          <video
            controls
            className="w-full rounded-lg shadow-lg border border-gray-300"
          >
            <source src={streamData?.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
  
        {/* Close Button */}
        <button
          onClick={() => setSelectedRecording(null)}
          className="mt-4 bg-red-500 text-white px-5 py-2 rounded-lg font-medium shadow-md hover:bg-red-600 transition w-full"
        >
           Close
        </button>
      </div>
    )}
  </div>
  
  );
};

export default RecordingsList;
