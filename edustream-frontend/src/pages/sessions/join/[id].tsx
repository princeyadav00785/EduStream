"use client";
import { useRouter } from "next/router";
import LiveKitRoomComponent from "@/components/session/LivekitRoom";

const SessionPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const userId = "user-" + Math.random().toString(36).substring(7); 

  if (!id) return <p>Invalid session</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* <h1 className="text-xl font-bold">Live Session: {id}</h1> */}
      <LiveKitRoomComponent userId={userId} sessionId={id as string} />
    </div>
  );
};

export default SessionPage;
