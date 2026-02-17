🔐 MERN Secure Authentication System

🌐 Live Demo: https://mern-secure-auth.onrender.com

A full-featured authentication system built with the MERN stack, focusing on secure token-based authentication and real-world auth workflows.

🚀 Features

Email & password authentication (bcrypt hashing)

JWT-based authentication (Access & Refresh Tokens)

HTTP-only cookie storage

Google OAuth integration (Firebase)

Email verification with 6-digit OTP

Password reset via secure email link

Protected routes with custom middleware

User profile management

Simple Todo feature (Redux Toolkit)

🧪 How to Test

Register with email & password

Login with Google OAuth

Access the protected profile page

Use the Todo feature after authentication

⚠️ Email verification and password reset are limited in the live demo due to email service restrictions.

🛠 Tech Stack
Frontend

React.js

Redux Toolkit

Axios

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT

bcrypt

Firebase (Google OAuth)

Resend (Email service)

🔐 Authentication Flow

Short-lived Access Token

Long-lived Refresh Token

Tokens stored in HTTP-only cookies

Middleware-based route protection

📂 Installation <br/>

1️⃣ Clone the repository
git clone https://github.com/NaderGh78/mern-secure-auth
cd mern-secure-auth

2️⃣ Install dependencies

Server:

npm install


client:

cd client
npm install

3️⃣ Environment Variables

Create a .env file in the backend folder:

PORT=<br/>

MONGO_URI=<br/>

JWT_ACCESS_SECRET=<br/>

JWT_REFRESH_SECRET=<br/>

NODE_ENV=<br/>

VITE_FIREBASE_API_KEY=<br/>

RESEND_API_KEY=<br/>

PROJECT_NAME=<br/>

WELCOME_USER_MSG=<br/>

PROJECT_URL=<br/>

CLIENT_URL=<br/>

4️⃣ Run the project

Server:

cd server
npm run dev


Client:

cd client
npm run dev

⚠️ Note

Email verification and password reset are demonstrated using a test email setup.
Due to current email service limitations, these features are not fully enabled for public users in the live demo.