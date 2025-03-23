

# EduStream – Live-Streaming Marketplace for Education  

EduStream is a scalable live-streaming marketplace where educators can host interactive classes, and students can join in real time. The platform supports live video streaming, real-time chat, secure payments, and course management with a microservices architecture for seamless scalability.  

[Live Demo](https://edu-stream-frontend-five.vercel.app/) | [Frontend Repo](https://github.com/princeyadav00785/EduStream/tree/main/edustream-frontend) | [Backend Repo](https://github.com/princeyadav00785/EduStream/tree/main/edustream-backend)  

---

## Project Screenshots  

 | Live Class Session |  Home Page|
|--------------|--------------|  
 ![Class](https://github.com/user-attachments/assets/c111181a-9c0a-4f5a-a651-a849362f087a)   |  <img width="1470" alt="homepage" src="https://github.com/user-attachments/assets/a3c28b62-9d4b-4b27-99e0-c70d129ca8cd" /> |
---

## Features  

### Live Video Streaming  
- Uses WebRTC and LiveKit for real-time, high-quality video streaming.  
- Low latency for smooth live interactions.  
- Supports screen sharing and multiple participants.  

### Real-Time Chat  
- WebSocket-based chat for instant messaging.  
- Supports reactions, file sharing, and threaded discussions.  
- Messages are stored for later reference.  

### Secure Authentication  
- Uses JWT for session management and role-based access control.  
- Supports email and password authentication.  
- Google OAuth integration is in progress.  

### Course Management System  
- Instructors can create, update, and manage courses.  
- Students can enroll in courses and track progress.  
- Course ratings and feedback system.  

### Stripe Payment Integration  
- Secure payment processing for course enrollments and subscriptions.  
- Webhook-based transaction verification.  
- Refund and dispute management system.  

### Notifications System  
- Real-time notifications for class reminders and updates.  
- Email and in-app notifications for new messages and course updates.  

### Cloud Storage and Video Recording  
- Uses AWS S3 for media storage.  
- LiveKit Egress enables session recording.  
- Recorded sessions can be accessed later.  

### Interactive Whiteboard (New Feature)  
- Supports drawing, annotations, and shared documents.  
- Enhances collaboration between instructors and students.  

### AI-Powered Transcriptions and Summaries (Upcoming)  
- Live captions for meetings.  
- AI-generated meeting summaries.  

---

## Future Goals  

- Live meeting captions for accessibility.  
- AI-generated meeting summaries.  
- Quizzes section for interactive learning.  
- AI-driven Q&A assistant for students.  

---

## Tech Stack  

- Frontend: Next.js (TypeScript), Tailwind CSS  
- Backend: Node.js (Express, TypeScript), PostgreSQL (Prisma)  
- Streaming: LiveKit, WebRTC  
- Event Handling: Kafka  
- Payments: Stripe  
- Deployment & Scaling: Docker, Kubernetes  
- Storage: AWS S3  

---

## Folder Structure  

```
/edustream-backend  
  ├── auth-service  
  ├── auth-validation-service  
  ├── chat-service  
  ├── course-service  
  ├── notification-service  
  ├── payment-service  
  ├── stream-service  
/edustream-frontend  
```

---

## Setup and Running  

### Backend Services  
Each microservice is written in TypeScript and requires compilation before running:  

```sh
cd edustream-backend/{service-name}  
npm install  
npx tsc  
node dist/index.js  
```

### Frontend  

```sh
cd edustream-frontend  
npm install  
npm run dev  
```

---

## Environment Variables  

Each microservice requires a `.env` file with specific configurations.  

### Auth Service (`auth-service/.env`)  
```
SERVICE_NAME=Auth_Server  
PORT=5000  
DATABASE_URL=  
JWT_SECRET=your_secret_key  
```

### Auth Validation Service (`auth-validation-service/.env`)  
```
JWT_SECRET=your_secret_key  
PORT=5004  
```

### Chat Service (`chat-service/.env`)  
```
SERVICE_NAME=Chat_Server  
PORT=5001  
JWT_SECRET=your_jwt_secret  
```

### Course Service (`course-service/.env`)  
```
DATABASE_URL=""  
PORT=  
```

### Payment Service (`payment-service/.env`)  
```
DATABASE_URL=  
STRIPE_SECRET_KEY=  
PORT=4003  
STRIPE_WEBHOOK_SECRET=  
FRONTEND_URL=http://localhost:3000  
COURSE_API_URL=http://localhost:4002  
AUTH_API_URL=http://localhost:5000  
```

### Stream Service (`stream-service/.env`)  
```
SERVICE_NAME=Stream_Server  
PORT=5003  
JWT_SECRET=  
LIVEKIT_API_KEY=  
LIVEKIT_API_SECRET=  
LIVEKIT_URL=ws://localhost:7880  
AWS_ACCESS_KEY_ID=  
AWS_SECRET_ACCESS_KEY=  
AWS_REGION=  
AWS_BUCKET_NAME=  
```

### Frontend (`edustream-frontend/.env`)  
```
NEXT_PUBLIC_STREAM_API_URL=http://localhost:5003/api/session  
NEXT_PUBLIC_AUTH_API_URL=http://localhost:5000/api/auth  
NEXT_PUBLIC_LIVEKIT_URL=ws://localhost:7880  
NEXT_PUBLIC_LK_TOKEN_ENDPOINT=ws://localhost:7880  
NEXT_PUBLIC_COURSE_API_BASE_URL=http://localhost:4002/  
```

---

## LiveKit Setup  

EduStream uses LiveKit for real-time video streaming. You need to set up a LiveKit server and configure your API keys in `.env`.  

### LiveKit Egress Setup  
Egress enables recording and streaming of sessions:  
1. Deploy LiveKit Egress.  
2. Set up AWS S3 for storage.  
3. Configure `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, and `AWS_BUCKET_NAME`.  

---

## Architecture Overview  

EduStream follows a microservices architecture, where each service handles a specific responsibility:  

- **Auth Service** - User authentication and session management.  
- **Chat Service** - Real-time chat with WebSockets.  
- **Stream Service** - Manages video streaming sessions with LiveKit.  
- **Payment Service** - Handles transactions via Stripe.  
- **Notification Service** - Sends real-time alerts.  
- **Course Service** - Manages course content.  

---

## Contributions  

EduStream is an open-source project, and contributions are welcome.  

If you have suggestions or want to contribute, feel free to open an issue or a pull request.  
