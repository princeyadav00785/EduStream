import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaVideo, FaPlayCircle, FaBookOpen, FaShoppingCart, FaPlusCircle, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const isTeacherOrAdmin = userInfo?.role === "teacher" || userInfo?.role === "admin";

  const sections = [
    { title: "All Sessions", link: "/sessions/allSessions", icon: <FaPlayCircle /> },
    { title: "Create Session", link: "/sessions/createSession", icon: <FaPlus />, adminOnly: true },
    { title: "Join a Session", link: "/sessions/join/[id]", icon: <FaVideo /> },
    { title: "Session Details", link: "/session/[id]", icon: <FaVideo /> },
    { title: "All Courses", link: "/courses/allCourses", icon: <FaBookOpen /> },
    { title: "Add New Course", link: "/courses/addCourses", icon: <FaPlus />, adminOnly: true },
    { title: "Bought Courses", link: "/bought-courses", icon: <FaShoppingCart /> },
    { title: "Available Recordings", link: "/available-recordings", icon: <FaVideo /> },
  ];
  

  return (

    <div className="p-6 md:p-10 min-h-full bg-neutral-50 dark:bg-neutral-900 flex flex-col gap-10 ">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="flex flex-col items-center justify-center gap-6 p-10 rounded-2xl bg-white dark:bg-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-opacity-90 cursor-pointer"
            onClick={() => window.location.href = section.link}
          >
            <div className="text-5xl text-blue-600">{section.icon}</div>
            <span className="text-lg font-medium text-gray-800 dark:text-white">{section.title}</span>
          </div>
        ))}
      </div>

      {/* Floating Button for Create New Session (Visible only for Teacher/Admin) */}
      {isTeacherOrAdmin && (
        <button
          onClick={() => window.location.href = "/create-session"}
          className="fixed bottom-10 right-10 bg-blue-600 text-white p-5 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
        >
          <FaPlusCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default Dashboard;
