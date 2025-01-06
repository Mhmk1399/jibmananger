'use client'
import { useEffect, useState } from 'react'
import { getSocket } from '@/lib/socket-client'

interface Message {
    userId: string
    text: string
}

export const Chat = ({ groupId, userId }: { groupId: string; userId: string }) => {
    const [messages, setMessages] = useState<Message[]>([])
    const [message, setMessage] = useState('')

    useEffect(() => {
        const socket = getSocket()
        
        socket.emit('enterRoom', { userId, groupId })

        socket.on('message', (newMessage: Message) => {
            setMessages(prev => [...prev, newMessage])
        })

        return () => {
            socket.off('message')
        }
    }, [groupId, userId])

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const socket = getSocket()
        
        if (message.trim()) {
            socket.emit('message', {
                userId,
                groupId,
                text: message
            })
            setMessage('')
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-4">
                {messages.map((msg, i) => (
                    <div key={i} className={`mb-2 ${msg.userId === userId ? 'text-right' : ''}`}>
                        <div className={`inline-block p-2 rounded ${
                            msg.userId === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'
                        }`}>
                            {msg.text}
                        </div>
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
    )
}
