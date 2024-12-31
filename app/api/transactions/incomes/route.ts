import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import { income } from "@/models/transactions/income";
import { verifyJwtToken } from "@/lib/verifyJwtToken";
export async function GET(req: NextRequest) {
    try {
        await connect();
        const token = req.headers.get("authorization")?.split(" ")[1];
        const decoded = await verifyJwtToken(token);

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const outcomes = await income.find({ user: decoded.id })
            .populate('category')
            .populate('recipient')
            .populate('bank');

        return NextResponse.json(outcomes);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching outcomes" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const token = req.headers.get("authorization")?.split(" ")[1];
        const decoded = await verifyJwtToken(token);

        if (!decoded) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const outcome = await income.create({
            ...data,
            user: decoded.id,
            date: data.date || new Date()
        });

        return NextResponse.json(outcome, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error creating outcome" }, { status: 500 });
    }
}
