import { Group } from "@/models/groups";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const url = request.nextUrl;
    const groupId = url.pathname.split('/')[3];
    const transactionId = url.pathname.split('/')[5];

    if (!groupId || !transactionId) {
      return NextResponse.json(
        { error: "Group ID or Transaction ID missing" },
        { status: 400 }
      );
    }

    const group = await Group.findOne(
      {
        _id: groupId,
        "transactions._id": transactionId,
      },
      { "transactions.$": 1 }
    );

    if (!group || !group.transactions || group.transactions.length === 0) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(group.transactions[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch transaction", details: error },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connect();
    const url = request.nextUrl;
    const groupId = url.pathname.split('/')[3];
    const transactionId = url.pathname.split('/')[5];

    if (!groupId || !transactionId) {
      return NextResponse.json(
        { error: "Group ID or Transaction ID missing" },
        { status: 400 }
      );
    }

    const updates = await request.json();

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
