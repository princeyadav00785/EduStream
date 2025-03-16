const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <h1 className="mt-4 text-lg font-semibold">Loading...</h1>
    </div>
  );
};

export default LoadingScreen;
