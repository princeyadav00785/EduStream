"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Recording {
  recordingId: string;
  name: string;
  status: string;
  url?: string;
}

const RecordingsList: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const res = await fetch("/api/recording/list");
        const data = await res.json();
        setRecordings(data.data || []);
      } catch (err) {
        console.error(err);
        setError("Error fetching recordings");
      }
    };
    fetchRecordings();
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Recordings</h1>
      {error && <p className="text-red-500">{error}</p>}
      {recordings.length === 0 ? (
        <p>No recordings available</p>
      ) : (
        <ul className="space-y-4">
          {recordings.map((rec) => (
            <li key={rec.recordingId} className="p-4 bg-gray-800 rounded">
              <p>
                <strong>ID:</strong> {rec.recordingId}
              </p>
              <p>
                <strong>Name:</strong> {rec.name}
              </p>
              <p>
                <strong>Status:</strong> {rec.status}
              </p>
              {rec.url && (
                <Link href={`/recordings/${rec.recordingId}`}>
                  <a className="text-blue-400 underline">Stream Recording</a>
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecordingsList;
