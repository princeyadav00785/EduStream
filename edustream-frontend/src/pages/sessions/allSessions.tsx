import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Session {
  id: string;
  title: string;
  instructorName: string;
  isLive: boolean;
}

const AllSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sessions/all`);
        setSessions(response.data);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Sessions</h2>
      <ul className="space-y-4">
        {sessions.map((session) => (
          <li key={session.id} className="p-4 border rounded-lg shadow">
            <h3 className="text-xl font-semibold">{session.title}</h3>
            <p className="text-gray-600">Instructor: {session.instructorName}</p>
            <p className={`font-bold ${session.isLive ? "text-green-500" : "text-gray-400"}`}>
              {session.isLive ? "Live 🔴" : "Upcoming 🕒"}
            </p>
            <Link href={`/sessions/${session.id}`} passHref>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
                View Details
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllSessions;
