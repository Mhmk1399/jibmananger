import { Group } from "@/models/groups";
import { GroupMember } from "@/models/groupMembers";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../lib/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        await connect();
        
        const userGroups = await GroupMember.find({ userId }).select('groupId');
        const groupIds = userGroups.map(member => member.groupId);
        const groups = await Group.find({ _id: { $in: groupIds } })
            .populate('ownerId', 'name')
            .sort({ createdAt: -1 });

        return NextResponse.json({ 
            success: true,
            groups 
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        
        await connect();
        const reqBody = await request.json();
        
        const newGroup = new Group({
            ...reqBody,
            ownerId: userId
        });
        const savedGroup = await newGroup.save();

        await GroupMember.create({
            groupId: savedGroup._id,
            userId: userId,
            role: 'owner'
        });

        return NextResponse.json({ 
            success: true,
            message: "Group created successfully", 
            group: savedGroup 
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ 
            success: false,
            error: error.message 
        }, { status: 500 });
    }
}
