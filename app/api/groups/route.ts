import { Group } from "@/models/groups";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await connect();
        const groups = await Group.find();
        return NextResponse.json({ groups }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
    }
}
export async function POST(request: NextRequest) {
    try {
        await connect();
        const reqBody = await request.json();
        const newGroup = new Group(reqBody);
        await newGroup.save();
        return NextResponse.json({ message: "Group created successfully", group: newGroup }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
    }
}

