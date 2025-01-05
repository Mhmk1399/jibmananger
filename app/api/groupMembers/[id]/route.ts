import {GroupMember }from "@/models/groupMembers";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        if (!connect) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        const { id } = params;
        const groupMember = await GroupMember.findById(id);
        if (!groupMember) {
            return NextResponse.json({ error: "Group member not found" }, { status: 404 });
        }
        return NextResponse.json({ groupMember }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch group member" }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        if (!connect) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        const { id } = params;
        await GroupMember.findByIdAndDelete(id);
        return NextResponse.json({ message: "Group member deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete group member" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        if (!connect) {
            return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
        }
        const { id } = params;
        const reqBody = await request.json();
        const groupMember = await GroupMember.findByIdAndUpdate(id, reqBody, { new: true });
        if (!groupMember) {
            return NextResponse.json({ error: "Group member not found" }, { status: 404 });
        }
        return NextResponse.json({ groupMember }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update group member" }, { status: 500 });
    }
}
