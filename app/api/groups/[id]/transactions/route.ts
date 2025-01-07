import { Group } from "@/models/groups";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";

// Create transaction
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: groupId } = await context.params;
  try {
    await connect();
    const transaction = await request.json();

    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      { $push: { transactions: transaction } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, group: updatedGroup },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create transaction", details: error },
      { status: 500 }
    );
  }
}

// Get all transactions
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: groupId } = await context.params;
  try {
    await connect();

    const group = await Group.findById(groupId).populate(
      "transactions.createdBy",
      "name"
    );

    return NextResponse.json(
      { success: true, transactions: group.transactions },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transactions", details: error },
      { status: 500 }
    );
  }
}
export async function PATCH(request: NextRequest) {
  try {
    await connect();
    const url = request.nextUrl;
    const groupId = url.pathname.split("/")[3];

    
    if (!groupId) {
      return NextResponse.json(
        { error: "Group ID missing" },
        { status: 400 }
      );
    }

    const updates = await request.json();
    const transactionId = updates.id;
    console.log(transactionId, "transactionId");

    const group = await Group.findOneAndUpdate(
      {
        _id: groupId,
        "transactions._id": transactionId,
      },
      {
        $set: {
          "transactions.$": updates,
        },
      },
      { new: true }
    );

    if (!group) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(group);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update transaction", details: error },
      { status: 500 }
    );
  }
}
