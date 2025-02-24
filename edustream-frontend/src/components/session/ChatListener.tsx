import { useEffect } from "react";
import { useRoomContext } from "@livekit/components-react";
import { RemoteParticipant, DataPacket_Kind } from "livekit-client";

const ChatListener = () => {
  const room = useRoomContext();

  useEffect(() => {
    console.log("Room object:", room); 

    if (!room) return;

    const handleDataReceived = (
      payload: Uint8Array,
      participant?: RemoteParticipant,
      kind?: DataPacket_Kind,
      topic?: string
    ) => {
      console.log("Data event triggered!");
    
      const rawMessage = new TextDecoder().decode(payload);
    
      let message = rawMessage; 
      try {
        const parsed = JSON.parse(rawMessage);
        if (parsed?.message) {
          message = parsed.message; // Extracting actual chat text
        }
      } catch (error) {
        console.log("Received raw message, not JSON.");
      }
    
      const username = participant?.identity || "Unknown User";
    
      console.log("Message received:", { username, message, topic });
    
      // Send message to backend
      // sendMessageToBackend(username, message);
    };
    
    

    room.on("dataReceived", handleDataReceived);

    return () => {
      room.off("dataReceived", handleDataReceived);
    };
  }, [room]);

  // Send message function
  const sendTestMessage = () => {
    if (!room) {
      console.error("Room is not available!");
      return;
    }

    room.localParticipant.publishData(
      new TextEncoder().encode("Hello from me!"),
      { reliable: true }
    );

    console.log("Test message sent!");
  };

  return (
    <div>
      <button onClick={sendTestMessage} className="p-2 bg-blue-500 text-white rounded">
         Send Test Message
       </button>
    </div>
  );
};

export default ChatListener;
