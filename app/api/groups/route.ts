import { Group } from "@/models/groups";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "../../../lib/getDataFromToken";

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        await connect();

        const groups = await Group.find({ members: userId });
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
            members: [userId],
            ownerId: userId
        });
        const savedGroup = await newGroup.save();



        return NextResponse.json({
            success: true,
            message: "Group created successfully",
            group: savedGroup
        }, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}