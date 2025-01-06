import { Group } from "@/models/groups";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Create transaction
export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id: groupId } = await context.params;
    try {
        await connect();
        const transaction = await request.json();

        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $push: { transactions: transaction } },
            { new: true }
        );

        return NextResponse.json({ success: true, group: updatedGroup }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }
}

// Get all transactions
export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id: groupId } = await context.params;
    try {
        await connect();

        const group = await Group.findById(groupId).populate('transactions.createdBy', 'name');
        
        return NextResponse.json({ success: true, transactions: group.transactions }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
    }
}
