// import { Request, Response } from "express";
// import axios from "axios";
// import fs from "fs";
// // import AWS from "aws-sdk";
// import { exec } from "child_process";

// // LiveKit API Config
// const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!;
// const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!;
// const LIVEKIT_API_URL = process.env.LIVEKIT_URL!;
// // AWS S3 Config
// // const s3 = new AWS.S3({
// //   accessKeyId: "your_access_key",
// //   secretAccessKey: "your_secret_key",
// //   region: "your_s3_region",
// //   signatureVersion: "v4",
// // });

// //  **Start Recording**
// export const startRecording = async (req: Request, res: Response) => {
//   try {
//     const { roomName, outputUrl } = req.body;
//     const room_name=roomName;
//     // const recorderToken = await generateLiveKitToken("recorder", roomName);
//     const response = await axios.post(
//       "http://localhost:7880/v2/egress",
//       {
//         room_name: room_name, // Required: Room to record
//         egress_type: "room_composite", // Required: Specifies Room Composite Egress
//         file: {
//           filepath: outputUrl, // Where to save the file (e.g., S3 or local storage)
//         },
//         options: {
//           layout: "grid", // Layout type (grid, speaker, etc.)
//           audio_only: false, // Capture both audio and video
//           video_only: false, // Capture both audio and video
//         },
//       },
//       {
//         headers: {
//           Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJ2aWRlbyI6eyJyb29tSm9pbiI6dHJ1ZSwicm9vbSI6ImZmYTEwMDRiLTJlOWEtNDRhOC05ZTkyLTAwMTE0ZjY4ZjMxYiJ9LCJpc3MiOiJBUElBUWpBaE01emRWYVciLCJleHAiOjE3NDA1OTk3NTAsIm5iZiI6MCwic3ViIjoidXNlci1xc3JmYSJ9.liJkpqySNDrhaql-bvBZ-hTdlDb127GYG6LZnVfsUG8`, // JWT token for Egress API
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.status(200).json({ message: "Recording started", data: response.data });
//   } catch (error: any) {
//     res.status(500).json({
//       error: "Failed to start recording",
//       details: error.response?.data || error.message,
//     });
//   }
// };


// // **Stop Recording**
// export const stopRecording = async (req: Request, res: Response) => {
//   try {
//     const { recordingId } = req.body;

//     const response = await axios.post(
//       `${LIVEKIT_API_URL}/recording/stop`,
//       { recordingId },
//       { auth: { username: LIVEKIT_API_KEY, password: LIVEKIT_API_SECRET } }
//     );

//     res.status(200).json({ message: "Recording stopped", data: response.data });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to stop recording", details: error });
//   }
// };

// //  **Get Recording Status**
// export const getRecordingStatus = async (req: Request, res: Response) => {
//   try {
//     const { recordingId } = req.params;

//     const response = await axios.get(
//       `${LIVEKIT_API_URL}/recording/status/${recordingId}`,
//       { auth: { username: LIVEKIT_API_KEY, password: LIVEKIT_API_SECRET } }
//     );

//     res.status(200).json({ message: "Recording status fetched", data: response.data });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch recording status", details: error });
//   }
// };

// // **List All Recordings**
// export const listRecordings = async (_req: Request, res: Response) => {
//   try {
//     const response = await axios.get(
//       `${LIVEKIT_API_URL}/recording/list`,
//       { auth: { username: LIVEKIT_API_KEY, password: LIVEKIT_API_SECRET } }
//     );

//     res.status(200).json({ message: "All recordings fetched", data: response.data });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch recordings", details: error });
//   }
// };

// //  **Get a Specific Recording**
// export const getRecording = async (req: Request, res: Response) => {
//   try {
//     const { recordingId } = req.params;

//     const response = await axios.get(
//       `${LIVEKIT_API_URL}/recording/${recordingId}`,
//       { auth: { username: LIVEKIT_API_KEY, password: LIVEKIT_API_SECRET } }
//     );

//     res.status(200).json({ message: "Recording details fetched", data: response.data });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch recording details", details: error });
//   }
// };

// export const livekitWebhook = async (req: Request, res: Response) => {
//     console.log("LiveKit Webhook Event:", req.body);
  
//     // Handle event types (recording start, complete, error)
//     const { event, data } = req.body;
  
//     if (event === "recording.complete") {
//       console.log(`Recording completed: ${data.recordingId}`);
  
//       // Process and upload to S3
//       processAndUploadToS3(data.outputUrl);
//     }
  
//     res.status(200).json({ message: "Webhook received" });
//   };
  
//   // **Process Recording with FFmpeg and Upload to S3**
//   const processAndUploadToS3 = async (videoPath: string) => {
//     const outputFilePath = `/tmp/processed-${Date.now()}.mp4`;
  
//     // Convert Video Using FFmpeg
//     exec(`ffmpeg -i ${videoPath} -c:v libx264 -preset fast ${outputFilePath}`, async (err) => {
//       if (err) {
//         console.error("FFmpeg Processing Error:", err);
//         return;
//       }
  
//       // Upload to S3
//       const fileStream = fs.createReadStream(outputFilePath);
//       const uploadParams = {
//         Bucket: "your-s3-bucket",
//         Key: `recordings/${Date.now()}.mp4`,
//         Body: fileStream,
//         ContentType: "video/mp4",
//       };
  
//       try {
//         // const uploadResponse = await s3.upload(uploadParams).promise();
//         // console.log("File uploaded to S3:", uploadResponse.Location);
//       } catch (uploadErr) {
//         console.error("S3 Upload Error:", uploadErr);
//       }
//     });
//   };
  


import { Request, Response } from 'express';
import { EgressClient, EncodedFileOutput, S3Upload } from 'livekit-server-sdk';
import dotenv from 'dotenv';

dotenv.config();

const LIVEKIT_HOST = process.env.LIVEKIT_URL!;
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!;

export const startRecording = async (req: Request, res: Response) => {
  try {
    const { roomName } = req.body;

    const egressClient = new EgressClient(LIVEKIT_HOST, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

    const fileOutput = new EncodedFileOutput({
      filepath: `livekit-recordings/${roomName}.mp4`,
      output: {
        case: 's3', 
        value: new S3Upload({
          accessKey: process.env.AWS_ACCESS_KEY_ID!,
          secret: process.env.AWS_SECRET_ACCESS_KEY!,
          region: process.env.AWS_REGION!,
          bucket: process.env.AWS_BUCKET_NAME!,
        }),
      },
    });

    const info = await egressClient.startRoomCompositeEgress(
      roomName,
      { file: fileOutput },
      {
        layout: 'grid',
        // customBaseUrl: 'https://your-custom-template-url.com', 
      }
    );

    res.status(200).json({
      message: 'Recording started',
      egressId: info.egressId,
    });
  } catch (error:any) {
    console.error('Failed to start recording:', error);
    res.status(500).json({ error: 'Failed to start recording', details: error});
  }
};



export const stopRecording = async (req: Request, res: Response) => {
  try {
    const { egressId } = req.body; 

    const egressClient = new EgressClient(LIVEKIT_HOST, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);
    await egressClient.stopEgress(egressId);

    res.status(200).json({ message: 'Recording stopped successfully', egressId });
  } catch (error:any) {
    console.error('Failed to stop recording:', error);
    res.status(500).json({ error: 'Failed to stop recording', details: error });
  }
};
