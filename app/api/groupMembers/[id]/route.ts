import { Group } from "@/models/groups";
import { GroupMember } from "@/models/groupMembers";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log("Connecting to database...");
        await connect();
        const userId = getDataFromToken(request);
        console.log(`User ID from token: ${userId}`);
        const groupId = params.id;
        console.log(`Fetching group with ID: ${groupId}`);
        const group = await Group.findById(groupId).populate('ownerId', 'name');
        if (!group) {
            console.error("Group not found");
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }
        console.log("Group fetched successfully");
        return NextResponse.json({ group }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch group:", error);
        return NextResponse.json({ error: "Failed to fetch group" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log("Connecting to database...");
        await connect();
        const userId = getDataFromToken(request);
        console.log(`User ID from token: ${userId}`);
        const groupId = params.id;
        console.log(`Deleting group with ID: ${groupId}`);
        const group = await Group.findByIdAndDelete(groupId);
        if (!group) {
            console.error("Group not found");
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }
        console.log("Deleting associated group members...");
        await GroupMember.deleteMany({ groupId: group._id });
        console.log("Group and associated members deleted successfully");
        return NextResponse.json({ message: "Group deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to delete group:", error);
        return NextResponse.json({ error: "Failed to delete group" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        console.log("Connecting to database...");
        await connect();
        const userId = getDataFromToken(request);
        console.log(`User ID from token: ${userId}`);
        const groupId = params.id;
        const reqBody = await request.json();
        console.log(`Updating group with ID: ${groupId}`);
        const updatedGroup = await Group.findByIdAndUpdate(groupId, reqBody, { new: true });
        if (!updatedGroup) {
            console.error("Group not found");
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }
        console.log("Group updated successfully");
        return NextResponse.json({ message: "Group updated successfully", group: updatedGroup }, { status: 200 });
    } catch (error) {
        console.error("Failed to update group:", error);
        return NextResponse.json({ error: "Failed to update group" }, { status: 500 });
    }
}