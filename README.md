# ChatGPT Clone

A full-stack ChatGPT-like chat application built with React, Node.js, and the OpenAI API.

## Features

- 🤖 Real-time AI chat powered by GPT-3.5-turbo
- 💬 Persistent conversation context within a session
- 🎨 Dark theme UI matching ChatGPT's design
- 📱 Responsive design (mobile-friendly)
- ⌨️ Typing indicator while AI is responding
- 🗂️ Multiple conversation history in sidebar
- ⚡ Fast and lightweight with Vite + React

## Tech Stack

**Frontend:**
- React 18
- Vite
- Axios

**Backend:**
- Node.js
- Express
- OpenAI Node.js SDK
- dotenv, cors

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd chat-gtp-project
   ```

2. Install server dependencies:
   ```bash
   cd server && npm install
   ```

3. Install client dependencies:
   ```bash
   cd ../client && npm install
   ```

4. Configure environment variables:
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

### Running the App

1. Start the backend server (from `server/`):
   ```bash
   npm start
   # or for development with hot-reload:
   npm run dev
   ```

2. Start the frontend (from `client/`):
   ```bash
   npm run dev
   ```

3. Open your browser at [http://localhost:5173](http://localhost:5173)

The backend runs on port **3001** by default.

## Project Structure

```
chat-gtp-project/
├── server/
│   ├── index.js          # Express server + OpenAI API proxy
│   ├── package.json
│   ├── .env.example      # Environment variable template
│   └── .gitignore
├── client/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx
│       ├── App.jsx        # Root component with sidebar
│       ├── App.css        # Global styles
│       └── components/
│           ├── ChatWindow.jsx   # Chat logic + API calls
│           ├── MessageList.jsx  # Message display + welcome screen
│           ├── MessageItem.jsx  # Individual message bubble
│           └── ChatInput.jsx    # Text input with send button
└── package.json           # Workspace root
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/chat` | Send messages to OpenAI |

### POST `/api/chat`

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**
```json
{
  "message": {
    "role": "assistant",
    "content": "Hello! How can I help you today?"
  }
}
```

## License

MIT