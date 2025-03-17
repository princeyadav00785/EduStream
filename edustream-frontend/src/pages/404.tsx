import Link from "next/link";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! Page not found.</p>
      <Link href="/" className="text-blue-600 hover:underline">
        🔙 Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
