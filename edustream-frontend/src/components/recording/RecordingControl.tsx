"use client";
import { useState } from "react";

const RecordingControl: React.FC<{ roomName: string ,sessionId:string,sessionName:string}> = ({ roomName,sessionId,sessionName }) => {
  const [recordingStatus, setRecordingStatus] = useState<string>("");
  const [recordingId, setRecordingId] = useState<string>("");
  const authToken = localStorage.getItem("authToken");
  
  const startRecording = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/session/recording/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" , Authorization: authToken ? `Bearer ${authToken}` : "",},
        body: JSON.stringify({ roomName, outputUrl: "",sessionId,sessionName }), 
      });
      if(res.status==200)
      {const data = await res.json();
      console.log(data);
      setRecordingId(data.egressId); 
      setRecordingStatus("Recording started");}
      else {
        setRecordingStatus("Error starting recording");
      }
    } catch (error) {
      console.error(error);
      setRecordingStatus("Error starting recording");
    }
  };

  const stopRecording = async () => {
    try {
      const res = await fetch("http://localhost:5003/api/session/recording/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: authToken ? `Bearer ${authToken}` : "", },
        body: JSON.stringify({ egressId :recordingId }),
      });
      const data = await res.json();
      setRecordingStatus("Recording stopped");
    } catch (error) {
      console.error(error);
      setRecordingStatus("Error stopping recording");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <button
        onClick={startRecording}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Start Recording
      </button>
      <button
        onClick={stopRecording}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Stop Recording
      </button>
      <p className="text-white">{recordingStatus}</p>
    </div>
  );
};

export default RecordingControl;
