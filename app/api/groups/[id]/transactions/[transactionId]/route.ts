import { Group } from "@/models/groups";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Update transaction
export async function PATCH(
    request: NextRequest,
    context: { params: { groupId: string; transactionId: string } }
) {
    try {
        await connect();
        const { groupId, transactionId } = context.params;
        const updates = await request.json();

        const group = await Group.findOneAndUpdate(
            {
                _id: groupId,
                "transactions._id": transactionId
            },
            {
                $set: { "transactions.$": { ...updates, _id: transactionId } }
            },
            { new: true }
        );

        return NextResponse.json({ success: true, group }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
    }
}



