import { Group } from "@/models/groups";
import { User } from "@/models/users";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
     const { id: groupId } = await context.params; // Unwrapping params
     try {
       
        await connect();

        const group = await Group.findById(groupId)
            .populate('members', 'name phoneNumber')
            .populate('ownerId', 'name phoneNumber');

        if (!group) {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }

        const stats = {
            memberCount: group.members.length,
            totalTransactions: 0, // You can add transaction count logic here
            messageCount: 0, // You can add message count logic here
            lastActivity: group.updatedAt,
            groupInfo: group,
        };

        return NextResponse.json({ success: true, stats }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch group",detials:error }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        const { id: groupId } = await context.params; // Unwrapping params
        await connect();
        const { phoneNumber, name } = await request.json();

        // Check if user exists
        let user = await User.findOne({ phoneNumber });

        // If user doesn't exist, create new user
        if (!user) {
            user = await User.create({
                name,
                phoneNumber,
                password: phoneNumber, // Using phone number as initial password
            });
        }

        // Add user to group
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: user._id } }, // Using addToSet to prevent duplicates
            { new: true }
        ).populate('members');

        if (!updatedGroup) {
            return NextResponse.json({ error: "Group not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Member added successfully",
            group: updatedGroup,
        }, { status: 200 });
    } catch (error) {

        return NextResponse.json({ error: "Failed to update group" ,detials:error }, { status: 500 });
    }
}
