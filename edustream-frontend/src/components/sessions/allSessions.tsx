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
    <div className="min-h-screen bg-white text-black p-8">
      <h2 className="text-4xl font-bold text-center mb-4">📚 All Sessions</h2>
    <hr/>
      {/* Loading State */}
      {isLoading && <LoadingScreen />}

      {/* Error State */}
      {error && <ErrorScreen message="Failed to load sessions. Please try again." />}

      {/* Sessions List */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions?.map((session) => (
          <div 
            key={session.id} 
            className="p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all bg-white hover:scale-105"
          >
            <h3 className="text-2xl font-semibold mb-2">{session.title}</h3>
            <p className="text-gray-600 mb-2">👨‍🏫 {session.instructorName}</p>
            
            <p className={`font-medium ${session.isLive ? "text-green-600" : "text-yellow-500"}`}>
              {session.isLive ? "🔴 Live Now" : "🕒 Upcoming"}
            </p>

            <Link href={`/session/${session.id}`} passHref>
              <button className="mt-4 w-full py-2 rounded-md bg-black text-white hover:bg-gray-900 transition-all font-semibold">
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


