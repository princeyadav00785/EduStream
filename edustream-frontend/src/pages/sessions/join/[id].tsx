"use client";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; 
import LiveKitRoomComponent from "@/components/session/LivekitRoom";
import { BaseLayout } from "@/components/baseLayout/baseLayout";

const SessionPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const userId = useSelector((state: RootState) => state.auth.userInfo?.id);
  const userName = useSelector((state: RootState) => state.auth.userInfo?.name);

  if (!id) return <p>⚠️ Invalid session.</p>;
  if (!userId) return <p>🔒 Unauthorized. Please login.</p>;

  return (
    <BaseLayout>
      <div className="">
        <LiveKitRoomComponent userId={userId} userName={userName} sessionId={id as string} />
      </div>
    </BaseLayout>
  );
};

export default SessionPage;
