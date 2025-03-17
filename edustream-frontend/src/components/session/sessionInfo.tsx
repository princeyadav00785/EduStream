import Link from "next/link";
import useGet from "../../hooks/useGet";

interface Session {
  id: string;
  title: string;
  instructorName: string;
  description: string;
  isActive: boolean;
}

const SessionDetails = ({ id }: { id: string | string[] | undefined }) => {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-6">
      {/* Page Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Session Details</h1>

      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-md border border-gray-200 bg-gray-300">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">{session.title}</h2>

        <p className="text-gray-600 mb-2">
          <span className="font-medium">👨‍🏫 Instructor:</span> {session.instructorName}
        </p>

        <p className="text-gray-500 leading-relaxed mb-6">{session.description}</p>

        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium px-4 py-1 rounded-full ${
              session.isActive ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"
            }`}
          >
            {session.isActive ? "Live 🔴" : "Recording Available 🎥"}
          </span>
        </div>

        <Link
          href={session.isActive ? `/sessions/join/${session.id}` : `/sessions/recording/${session.id}`}
          passHref
        >
          <button
            className={`mt-6 w-full py-3 rounded-lg text-white text-sm font-medium tracking-wide transition-all ${
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
