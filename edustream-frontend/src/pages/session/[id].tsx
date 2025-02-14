import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

interface Session {
  id: string;
  title: string;
  instructorName: string;
  description: string;
  isLive: boolean;
}

const SessionDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchSession = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/session/${id}`);
        setSession(response.data);
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    fetchSession();
  }, [id]);

  if (!session) return <p>Loading session details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{session.title}</h2>
      <p className="text-gray-600">Instructor: {session.instructorName}</p>
      <p className="text-gray-500">{session.description}</p>
      <p className={`font-bold ${session.isLive ? "text-green-500" : "text-gray-400"}`}>
        {session.isLive ? "Live 🔴" : "Upcoming 🕒"}
      </p>
      {session.isLive && (
        <Link href={`/sessions/join/${session.id}`} passHref>
          <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded">
            Join Session
          </button>
        </Link>
      )}
    </div>
  );
};

export default SessionDetails;
