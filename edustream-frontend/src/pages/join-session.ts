// import { NextApiRequest, NextApiResponse } from "next";
// import { generateLiveKitToken } from "@/utils/livekit";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   const { userId, sessionId } = req.body;
//   if (!userId || !sessionId) {
//     return res.status(400).json({ error: "Missing userId or sessionId" });
//   }

//   const token = generateLiveKitToken(userId, sessionId);
//   res.json({ token });
// }
