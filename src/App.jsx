import React, { useState, useRef, useEffect } from 'react';
import { 
  TerminalSquare, 
  Send, 
  Key, 
  BookOpen, 
  Code, 
  Cpu, 
  Database,
  BrainCircuit,
  Settings,
  User,
  Bot,
  Trash2
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const INSTRUCTOR_PROMPT = `You are an expert Data Structures and Algorithms (DSA) Instructor at a top-tier tech company.
CRITICAL RULE 1: You must ONLY answer questions related to Data Structures, Algorithms, Coding, programming logic, and Computer Science. 
If the user asks about ANYTHING else (like politics, history, general knowledge, daily life, weather, etc.), you MUST politely decline and firmly say "I am strictly a DSA and coding instructor. I can only help you with programming and algorithms." DO NOT answer the non-DSA question.
However, you ARE ALLOWED to discuss the user's past chat history and context with you (e.g., if they ask what they studied yesterday or want a recap of your previous conversations). Your memory is your context.
CRITICAL RULE 2: When explaining DSA concepts or solving problems, you must explain the underlying intuition in the SIMPLEST and EASIEST way possible so a complete beginner can understand. Use relatable, real-world analogies.

Your goal is to help the user understand DSA concepts deeply and write efficient code.
When helping them:
1. Explain the underlying intuition and pattern using a simplest real-world analogy.
2. Ask leading questions if they are stuck.
3. Provide hints before giving the full solution.
4. When you do provide code, make sure it is clean, well-commented, and includes time/space complexity analysis.
Always be encouraging, professional, and clear.`;

function App() {
  const [apiKey] = useState(import.meta.env.VITE_GEMINI_API_KEY || '');
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('dsa_ai_messages');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [chatSession, setChatSession] = useState(null);

  const topics = [
    { title: 'Arrays & Hashing', icon: <Database size={18} /> },
    { title: 'Two Pointers', icon: <Code size={18} /> },
    { title: 'Linked Lists', icon: <Code size={18} /> },
    { title: 'Trees & Graphs', icon: <BrainCircuit size={18} /> },
    { title: 'Dynamic Programming', icon: <Cpu size={18} /> },
    { title: 'System Design', icon: <TerminalSquare size={18} /> },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    localStorage.setItem('dsa_ai_messages', JSON.stringify(messages));
  }, [messages]);

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
      setChatSession(null);
      localStorage.removeItem('dsa_ai_messages');
    }
  };

  const startChatSession = () => {
    if (!apiKey) return null;
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      const chatHistory = [
        {
          role: 'user',
          parts: [{ text: INSTRUCTOR_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: "Understood! I'm ready to be your expert DSA instructor. What concept or problem would you like to explore today?" }],
        },
      ];

      messages.forEach(msg => {
        chatHistory.push({
          role: msg.role === 'bot' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      });

      const session = model.startChat({
        history: chatHistory,
      });
      setChatSession(session);
      return session;
    } catch (error) {
      console.error('Error starting chat session:', error);
      return null;
    }
  };

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || !apiKey) {
      if (!apiKey) {
         setMessages(prev => [...prev, { role: 'bot', content: 'Developer: Please configure VITE_GEMINI_API_KEY in your .env file.' }]);
      }
      return;
    }

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsTyping(true);

    try {
      let session = chatSession;
      if (!session) {
        session = startChatSession();
        if (!session) {
          throw new Error('Could not start chat session. Check your API key.');
        }
      }

      const result = await session.sendMessage(userText);
      const botResponse = result.response.text();

      setMessages(prev => [...prev, { role: 'bot', content: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'bot', content: `**Error:** ${error.message || 'Something went wrong. Please check your API key and try again.'}` }]);
      setChatSession(null); // Reset session on error
    } finally {
      setIsTyping(false);
    }
  };

  const setTopic = (topic) => {
    setInput(`I would like to practice: ${topic}. Can you give me a problem or explain the core concepts?`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar - Dark UI */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">
             <TerminalSquare size={24} />
          </div>
          <h1>DSA AI</h1>
        </div>

        <div className="topics-list">
          <div className="topics-title">Practice Topics</div>
          {topics.map((t, idx) => (
            <button key={idx} className="topic-btn" onClick={() => setTopic(t.title)}>
              {t.icon}
              {t.title}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Area - Light UI */}
      <main className="main-area">
        <header className="chat-header">
          <div className="header-title">
            <h2>Your AI Instructor</h2>
            <p>Ready to master algorithms</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            {messages.length > 0 && (
              <button 
                onClick={clearChat}
                style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: '500' }}>
                <Trash2 size={16} /> Clear Chat
              </button>
            )}
            <div className="status-indicator">
              <div className="status-dot active"></div>
              Connected
            </div>
          </div>
        </header>

        <div className="chat-container">
          {messages.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <BookOpen size={32} />
              </div>
              <h3>Welcome to your DSA Instructor</h3>
              <p>Select a practice topic on the left or type your problem below to crack any concept easily!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                <div className="avatar">
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className="message-content">
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))
          )}
          
          {isTyping && (
            <div className="message bot">
              <div className="avatar">
                <Bot size={20} />
              </div>
              <div className="message-content typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <form className="input-form" onSubmit={handleSend}>
            <textarea
              className="chat-input"
              placeholder="Ask a question about DSA, e.g. 'How does binary search work?'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
            />
            <button 
              type="submit" 
              className="send-btn" 
              disabled={isTyping || !input.trim()}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
