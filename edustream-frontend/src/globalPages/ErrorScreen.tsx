interface ErrorProps {
  message: string;
}

const ErrorScreen = ({ message }: ErrorProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-red-600">
      <h1 className="text-3xl font-bold">❌ Oops! Something went wrong</h1>
      <p className="text-lg mt-2">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorScreen;
