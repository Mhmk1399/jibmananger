import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { GroupMember } from "@/models/groupMembers";

export async function GET(request: NextRequest) {
    try {
        await connect();
        if (!connect) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        const groupMembers = await GroupMember.find();
        return NextResponse.json({ groupMembers }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch group members" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connect();
        if (!connect) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        const reqBody = await request.json();
        const groupMember = new GroupMember(reqBody);
        await groupMember.save();
        return NextResponse.json({ message: "Group member created successfully", groupMember }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create group member" }, { status: 500 });
    }
}
