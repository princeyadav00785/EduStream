const LoadingScreen = () => {
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
          <h1 className="text-4xl font-bold text-cyan-400 animate-pulse">EduStream</h1>
          <div className="w-10 h-10 border-4 border-t-cyan-400 rounded-full animate-spin mt-4"></div>
      </div>
  );
};

export default LoadingScreen;
