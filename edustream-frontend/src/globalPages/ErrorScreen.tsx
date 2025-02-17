interface ErrorProps {
  message: string;
}

const ErrorScreen = ({ message }: ErrorProps) => {
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-red-800">
          <h1 className="text-3xl font-bold">❌ Oops! Something went wrong</h1>
          <p className="text-lg mt-2">{message}</p>
      </div>
  );
};

export default ErrorScreen;
