import { Server as NetServer } from 'http'
import { NextRequest, NextResponse } from 'next/server'
import { Server as ServerIO } from 'socket.io'
import { Message, Chat } from "@/models/chat"
import { verifyJwtToken } from "@/lib/verifyJwtToken"

const ADMIN = "Admin"
const UsersState = {
    users: [],
    setUsers: function (newUsersArray) {
        this.users = newUsersArray
    }
}

function buildMsg(name: string, text: string) {
    return {
        name,
        text,
        time: new Intl.DateTimeFormat('default', {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }).format(new Date())
    }
}

function getUsersInRoom(room: string) {
    return UsersState.users.filter(user => user.room === room)
}

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const res = new NextResponse()
    
    if (!res.socket.server.io) {
        const path = '/api/socket/io'
        const httpServer: NetServer = res.socket.server as any
        const io = new ServerIO(httpServer, {
            path,
            addTrailingSlash: false,
            cors: {
                origin: process.env.NODE_ENV === "production" 
                    ? false 
                    : ["http://localhost:3000"],
                methods: ["GET", "POST"]
            }
        })

        res.socket.server.io = io

        io.on('connection', socket => {
            console.log(`User ${socket.id} connected`)

            socket.emit('message', buildMsg(ADMIN, "Welcome to Chat!"))

            socket.on('enterRoom', async ({ userId, groupId }) => {
                socket.join(groupId)
                
                // Load previous messages
                const chat = await Chat.findOne({ group: groupId })
                    .populate('messages')
                    .exec()
                
                if (chat) {
                    socket.emit('previousMessages', chat.messages)
                }

                io.to(groupId).emit('message', buildMsg(ADMIN, `New user joined`))
                io.to(groupId).emit('userList', {
                    users: getUsersInRoom(groupId)
                })
            })

            socket.on('message', async ({ userId, groupId, text }) => {
                try {
                    const message = await Message.create({
                        sender: userId,
                        content: text,
                        groupId: groupId
                    })

                    await Chat.findOneAndUpdate(
                        { group: groupId },
                        { 
                            $push: { messages: message },
                            lastActivity: new Date()
                        },
                        { upsert: true }
                    )

                    io.to(groupId).emit('message', buildMsg(userId, text))
                } catch (error) {
                    console.error('Error saving message:', error)
                }
            })

            socket.on('disconnect', () => {
                console.log(`User ${socket.id} disconnected`)
            })
        })
    }

    return new NextResponse(null, { status: 200 })
}
