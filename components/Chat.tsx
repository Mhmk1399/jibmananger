'use client';
import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  userId: {
    name: string;
  };
}

export const Chat = ({ groupId }: { groupId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send message logic
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex-1 bg-white rounded-lg shadow-sm mb-4 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message._id} className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-900">
                  {message.userId.name}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-gray-700 mt-1 bg-gray-50 rounded-lg p-3">
                {message.content}
              </p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <form onSubmit={handleSendMessage} className="flex gap-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Send size={20} />
          Send
        </button>
      </form>
    </div>
  );
};
