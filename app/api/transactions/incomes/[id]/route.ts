import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import { income } from "@/models/transactions/income";
import { verifyJwtToken } from "@/lib/verifyJwtToken";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connect();
        const token = req.headers.get("authorization")?.split(" ")[1];
        const decoded = await verifyJwtToken(token);

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const outcome = await income.findOne({ 
            _id: params.id,
            user: decoded.id 
        })
        .populate('category')
        .populate('recipient')
        .populate('bank');

        if (!outcome) {
            return NextResponse.json({ message: "Outcome not found" }, { status: 404 });
        }

        return NextResponse.json(outcome);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching outcome" ,detials:error}, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connect();
        const token = req.headers.get("authorization")?.split(" ")[1];
        const decoded = await verifyJwtToken(token);

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const outcome = await income.findOneAndUpdate(
            { _id: params.id, user: decoded.id },
            data,
            { new: true }
        );

        if (!outcome) {
            return NextResponse.json({ message: "Outcome not found" }, { status: 404 });
        }

        return NextResponse.json(outcome);
    } catch (error) {
        return NextResponse.json({ message: "Error updating outcome" ,detials:error}, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connect();
        const token = req.headers.get("authorization")?.split(" ")[1];
        const decoded = await verifyJwtToken(token);

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const outcome = await income.findOneAndDelete({ 
            _id: params.id,
            user: decoded.id 
        });

        if (!outcome) {
            return NextResponse.json({ message: "Outcome not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Outcome deleted successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error deleting outcome",detials:error }, { status: 500 });
    }
}
