import { Group } from "@/models/groups";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";

export async function GET(request: NextRequest, context: { params: { id: string, transactionId: string } }) {
    try {
        await connect();
        const { id: groupId, transactionId } = context.params;
        
        const group = await Group.findOne(
            { 
                _id: groupId,
                "transactions._id": transactionId 
            },
            { "transactions.$": 1 }
        );
        
        return NextResponse.json(group.transactions[0]);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transaction",details:error }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string, transactionId: string } }) {
    try {
        await connect();
        const { id: groupId, transactionId } = context.params;
        const updates = await request.json();
        
        const group = await Group.findOneAndUpdate(
            { 
                _id: groupId,
                "transactions._id": transactionId 
            },
            { 
                $set: {
                    "transactions.$": updates
                }
            },
            { new: true }
        );
        
        return NextResponse.json(group);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update transaction",details:error }, { status: 500 });
    }
}
