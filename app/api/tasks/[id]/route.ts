import { Task } from "@/models/tasks";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const taskId = params.id;
        const task = await Task.findById(taskId);
        if (!task) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ task }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
    }
}
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const taskId = params.id;
        await Task.findByIdAndDelete(taskId);
        return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
    }
}
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const taskId = params.id;
        const reqBody = await request.json();
        const updatedTask = await Task.findByIdAndUpdate(taskId, reqBody, { new: true });
        if (!updatedTask) {
            return NextResponse.json({ error: "Task not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Task updated successfully", task: updatedTask }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
    }
}
