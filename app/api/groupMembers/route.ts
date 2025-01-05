import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { GroupMember } from "@/models/groupMembers";
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        console.log("Connecting to database...");
        await connect();
        if (!connect) {
            console.error("Database connection failed");
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        console.log("Fetching all group members...");
        const groupMembers = await GroupMember.find();
        console.log("Group members fetched successfully");
        return NextResponse.json({ groupMembers }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch group members:", error);
        return NextResponse.json({ error: "Failed to fetch group members" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        console.log("Connecting to database...");
        await connect();
        if (!connect) {
            console.error("Database connection failed");
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }

        console.log("Extracting user ID from token...");
        const userId = await getDataFromToken(request);
        console.log(`User ID from token: ${userId}`);

        const reqBody = await request.json();
        console.log("Creating new group member...");
        const groupMember = new GroupMember({ ...reqBody, userId });
        await groupMember.save();

        console.log("Group member created successfully");
        return NextResponse.json({ message: "Group member created successfully", groupMember }, { status: 201 });
    } catch (error) {
        console.error("Failed to create group member:", error);
        return NextResponse.json({ error: "Failed to create group member" }, { status: 500 });
    }
}