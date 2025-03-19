import useGet from "@/hooks/useGet";

interface Course {
  id: number;
  title: string;
  description: string;
  ratings: number;
  price: number;
  type: string;
}

const BoughtCourses = () => {
  // Fetch user data
  const { data: userData, isLoading: userLoading, error: userError } = useGet<any>(
    "http://localhost:5000/api/auth/profile/5"
  );

  // Fetch all courses
  const { data: courses, isLoading: coursesLoading, error: coursesError } = useGet<Course[]>(
    "http://localhost:4002/api/courses"
  );

  // Show loading state
  if (userLoading || coursesLoading) return <p className="text-center">Loading...</p>;

  // Show errors if any
  if (userError || coursesError)
    return <p className="text-center text-red-500">Error loading data.</p>;

  // Ensure data is available before filtering
  if (!userData || !courses) return <p className="text-center">No data available.</p>;

  // Extract enrolled course IDs
  const enrolledCourseIds = new Set(userData.user.enrolledCourses);

  const boughtCourses = courses.filter((course:Course) => enrolledCourseIds.has(course.id.toString()));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Bought Courses</h2>
      {boughtCourses.length === 0 ? (
        <p>No courses purchased yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boughtCourses.map((course:Course) => (
            <div key={course.id} className="bg-white shadow-lg rounded-lg p-4">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-500 text-sm">{course.description}</p>
              <p className="mt-2 text-green-600 font-semibold">
                Rs. {course.price} ({course.type})
              </p>
              <p className="text-yellow-500">⭐ {course.ratings}</p>
              <p className="text-gray-400 text-xs">
                Purchased on: {userData.user.coursePurchaseDates[course.id]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoughtCourses;
