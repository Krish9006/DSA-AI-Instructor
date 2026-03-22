# 🧠 DSA AI Instructor

An intelligent, context-aware artificial intelligence instructor built with React.js and Google's Gemini API. This chatbot is specifically engineered to help you master Data Structures and Algorithms by following a strict pedagogy: it explains the intuition, uses real-life analogies, and provides hints rather than directly spoon-feeding the code. 

![Project Status](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-Google-blue?logo=google&logoColor=white)

## ✨ Features

- **Strict Prompt Engineering:** The bot is strictly constrained to answer **ONLY** programming and DSA-related questions. It will politely decline any off-topic queries (politics, jokes, weather, etc.).
- **Context Persistence:** Includes full conversational context across browser tabs. Chat history is saved securely via `localStorage` and continuously injected into the AI's context on initialization.
- **Micro-Learnings & Analogies:** Complex DSA topics are explained in the absolute simplest terms with easy-to-understand real-world metaphors to benefit beginners.
- **Mix Theme UI:** A state-of-the-art UI mixing a dark sidebar navigation scheme with a light, glassy, responsive main chat interface. 
- **1-Click Topic Starters:** Dedicated shortcuts for standard DSA topics (Arrays, Two Pointers, Linked Lists, Trees, DP, etc.).
- **Reset Memory:** A single `Clear Chat` button to wipe all history and begin afresh.

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite
- **Styling:** Vanilla CSS3 (Custom Properties & Glassmorphism)
- **AI Integration:** `@google/generative-ai` SDK
- **Icons & Markdown Rendering:** `lucide-react`, `react-markdown`, `remark-gfm`

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- A Google API Key for Gemini. You can get one from [Google AI Studio](https://aistudio.google.com/).

### Installation & Run

1. **Clone the repository**
   ```bash
   git clone https://github.com/Krish9006/DSA-AI-Instructor.git
   cd DSA-AI-Instructor
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```

3. **Set up Local Credentials (Crucial Step)**  
   Create a file named `.env` in the root of the project and insert your Gemini API Key safely:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   > **Note:** Due to `.gitignore`, this key will never be publicly exposed to GitHub. Please never commit your API keys.

4. **Spin up Local Server**
   ```bash
   npm run dev
   ```

5. **Let's Code!**
   Navigate to `http://localhost:5173/` in your browser and drop your first algorithm question to the AI.

## 👨‍💻 Developed By

Built with passion and dedication to mastering Full-Stack AI Engineering. Focused on robust API integrations, responsive designs, and prompt design architecture.
