import { Server } from "socket.io";
import { Message, Chat } from "@/models/chat";
import { Server as HttpServer } from "http";

const ADMIN = "Admin";

const UsersState = {
    users: [],
    setUsers: function (newUsersArray: never[]) {
        this.users = newUsersArray
    }
}

interface User {
    id: string;
    name: string;
    room: string;
}

function buildMsg(sender: string, content: string): { sender: string; content: string } {
    return { sender, content };
}

function activateUser(socketId: string, userId: string, groupId: string): User {
    // Implementation needed
    return { id: socketId, name: userId, room: groupId };
}

function getUsersInRoom(room: string): User[] {
    // Implementation needed
    return [];
}

function getUser(socketId: string): User | undefined {
    // Implementation needed
    return undefined;
}

function userLeavesApp(socketId: string): void {
    // Implementation needed
}

export function initSocket(server: HttpServer) {
    const io = new Server(server, {
        cors: {
            origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:3000"]
        }
    });

    io.on('connection', socket => {
        console.log(`User ${socket.id} connected`);

        socket.emit('message', buildMsg(ADMIN, "Welcome to Chat!"));

        socket.on('enterRoom', async ({ userId, groupId }) => {
            const user = activateUser(socket.id, userId, groupId);

            socket.join(user.room);

            // Notify room members
            socket.emit('message', buildMsg(ADMIN, `You have joined the chat`));
            socket.broadcast.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has joined`));

            // Update user list for room
            io.to(user.room).emit('userList', {
                users: getUsersInRoom(user.room)
            });
        });

        socket.on('message', async ({ userId, groupId, text }) => {
            try {
                const message = await Message.create({
                    sender: userId,
                    content: text,
                    groupId: groupId
                });

                await Chat.findOneAndUpdate(
                    { group: groupId },
                    { 
                        $push: { messages: message },
                        lastActivity: new Date()
                    },
                    { upsert: true }
                );

                io.to(groupId).emit('message', buildMsg(userId, text));
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            const user = getUser(socket.id);
            userLeavesApp(socket.id);

            if (user) {
                io.to(user.room).emit('message', buildMsg(ADMIN, `${user.name} has left the chat`));
                io.to(user.room).emit('userList', {
                    users: getUsersInRoom(user.room)
                });
            }
        });
    });

    return io;
}
