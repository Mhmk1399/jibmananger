'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
    name: string;
    text: string;
}

export const Chat = ({ groupId, userId }: { groupId: string; userId: string }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.emit('enterRoom', { userId, groupId });

        newSocket.on('message', (message: Message) => {
            setMessages(prev => [...prev, message]);
        });

        return () => {
            newSocket.close();
        };
    }, [groupId, userId]);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (message.trim() && socket) {
            socket.emit('message', {
                userId,
                groupId,
                text: message
            });
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, i) => (
                    <div key={i} className="mb-2">
                        <span className="font-bold">{msg.name}: </span>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Type a message..."
                />
            </form>
        </div>
    );
};
