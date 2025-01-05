import {Group }from "@/models/groups";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const groupId = params.id;
        const group = await Group.findById(groupId);
        if (!group) {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }
        return NextResponse.json({ group }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch group" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const groupId = params.id;
        await Group.findByIdAndDelete(groupId);
        return NextResponse.json({ message: "Group deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete group" }, { status: 500 });
    }
}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const groupId = params.id;
        const reqBody = await request.json();
        const updatedGroup = await Group.findByIdAndUpdate(groupId, reqBody, { new: true });
        if (!updatedGroup) {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Group updated successfully", group: updatedGroup }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update group" }, { status: 500 });
    }
}