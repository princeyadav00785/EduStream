import { useRoomContext } from "@livekit/components-react";

const ChatListener = () => {
  const room = useRoomContext();

  room.on("dataReceived", (payload, participant) => {
    console.log(`Payload is : ${payload}`);
    const message = new TextDecoder().decode(payload);
    const username = participant?.name || "Unknown User";

    console.log("Message received:", { username, message });

    // will Send msg to backend later from here...
    // sendMessageToBackend({ username, message });
  });

  return null;
};

export default ChatListener;