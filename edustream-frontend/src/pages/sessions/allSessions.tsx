import Link from "next/link";
import useGet from "../../hooks/useGet"; 
import LoadingScreen from "@/globalPages/LoadingScreen";
import ErrorScreen from "@/globalPages/ErrorScreen";

interface Session {
  id: string;
  title: string;
  instructorName: string;
  isLive: boolean;
}

const AllSessions = () => {
  const { data: sessions, isLoading, error } = useGet<Session[]>(
    `${process.env.NEXT_PUBLIC_STREAM_API_URL}/all`
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400">
        EduStream Sessions
      </h2>

      {/* Loading State */}
      {isLoading && <LoadingScreen />}

      {/* Error State */}
      {error && <ErrorScreen message="Failed to load sessions. Please try again." />}

      {/* Sessions List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions?.map((session) => (
          <div 
            key={session.id} 
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-cyan-400 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-2">{session.title}</h3>
            <p className="text-gray-400 mb-2">👨‍🏫 Instructor: {session.instructorName}</p>
            
            <p className={`font-bold text-lg ${session.isLive ? "text-green-400" : "text-yellow-400"}`}>
              {session.isLive ? "🔴 Live Now" : "🕒 Upcoming"}
            </p>

            <Link href={`/session/${session.id}`} passHref>
              <button className="mt-4 w-full py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-white transition-all font-semibold">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!isLoading && !error && sessions?.length === 0 && (
        <p className="text-center text-gray-500 mt-6">No sessions available. Check back later! 😞</p>
      )}
    </div>
  );
};

export default AllSessions;
