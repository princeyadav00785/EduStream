import { useRouter } from "next/router";
import Link from "next/link";
import useGet from "../../hooks/useGet";

interface Session {
  id: string;
  title: string;
  instructorName: string;
  description: string;
  isActive: boolean;
}

const SessionDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: session, isLoading, error } = useGet<Session>(
    id ? `${process.env.NEXT_PUBLIC_STREAM_API_URL}/session-info/${id}` : ""
  );

  if (isLoading)
    return <p className="text-blue-500 text-center mt-6">🔄 Loading session details...</p>;
  if (error)
    return <p className="text-red-500 text-center mt-6">❌ Error: {error}</p>;
  if (!session)
    return <p className="text-gray-500 text-center mt-6">⚠️ No session found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-cyan-400">{session.title}</h2>
        <p className="text-gray-400">👨‍🏫 Instructor: {session.instructorName}</p>
        <p className="text-gray-300 mt-2">{session.description}</p>
        <p
          className={`mt-4 font-bold ${
            session.isActive ? "text-green-400" : "text-gray-500"
          }`}
        >
          {session.isActive ? "Live 🔴" : "Recording Available 🎥"}
        </p>

        {/* Conditional Button: Join if Live, Watch Recording otherwise */}
        <Link href={session.isActive ? `/sessions/join/${session.id}` : `/sessions/recording/${session.id}`} passHref>
          <button
            className={`mt-4 w-full px-6 py-3 rounded-lg transition-all ${
              session.isActive ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {session.isActive ? "Join Session" : "Watch Recording"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SessionDetails;
