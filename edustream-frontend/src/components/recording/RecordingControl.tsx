"use client";
import { useState, useEffect } from "react";
import usePost from "@/hooks/usePost";

const RecordingControl: React.FC<{ roomName: string; sessionId: string; sessionName: string }> = ({
  roomName,
  sessionId,
  sessionName,
}) => {
  const [recordingStatus, setRecordingStatus] = useState<string>("");
  const [recordingId, setRecordingId] = useState<string>("");

  const {
    data: startData,
    isLoading: isStarting,
    isSuccess: startSuccess,
    error: startError,
    postData: startRecording,
  } = usePost<{ egressId: string }>("http://localhost:5003/api/session/recording/start");

  const {
    isLoading: isStopping,
    isSuccess: stopSuccess,
    error: stopError,
    postData: stopRecording,
  } = usePost("http://localhost:5003/api/session/recording/stop");

  const handleStartRecording = async () => {
    await startRecording({ roomName, outputUrl: "", sessionId, sessionName });
  };

  const handleStopRecording = async () => {
    if (!recordingId) {
      setRecordingStatus("No active recording found!");
      return;
    }
    await stopRecording({ egressId: recordingId });
  };


  useEffect(() => {
    if (startSuccess && startData) {
      setRecordingId(startData.egressId);
      setRecordingStatus("Recording started");
    }
    if (startError) setRecordingStatus("Error starting recording");

    const timer = setTimeout(() => setRecordingStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [startSuccess, startData, startError]);


  useEffect(() => {
    if (stopSuccess) setRecordingStatus("Recording stopped");
    if (stopError) setRecordingStatus("Error stopping recording");


    const timer = setTimeout(() => setRecordingStatus(""), 5000);
    return () => clearTimeout(timer);
  }, [stopSuccess, stopError]);

  return (
    <div className="flex flex-col items-center space-y-3 p-3 w-full max-w-md mx-auto">
      <button
        onClick={handleStartRecording}
        disabled={isStarting}
        className={`w-full sm:w-auto px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-full shadow-md transition duration-300 ease-in-out ${
          isStarting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
        aria-label="Start Recording"
      >
        {isStarting ? "Starting..." : "Start Recording"}
      </button>

      <button
        onClick={handleStopRecording}
        disabled={isStopping}
        className={`w-full sm:w-auto px-3 py-1 text-xs sm:text-sm font-medium text-white rounded-full shadow-md transition duration-300 ease-in-out ${
          isStopping ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
        }`}
        aria-label="Stop Recording"
      >
        {isStopping ? "Stopping..." : "Stop Recording"}
      </button>

      {recordingStatus && (
        <p className="text-white text-center text-xs sm:text-sm font-medium opacity-100 transition-opacity duration-500">
          {recordingStatus}
        </p>
      )}
    </div>
  );
};

export default RecordingControl;
