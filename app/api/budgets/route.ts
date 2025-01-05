import {Task }from "@/models/tasks";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const tasks = await Task.find({});
        return NextResponse.json({ tasks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const task = new Task(reqBody);
        await task.save();
        return NextResponse.json({ message: "Task created successfully", task }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
    }
}
