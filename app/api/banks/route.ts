import  { bank }  from "@/models/bank"
import connect from "@/lib/data"
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest) {
    try {
        await connect();
        const banks = await bank.find({}).populate('user');
        return NextResponse.json(banks);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching banks" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const reqBody = await req.json();
        const newBank = new bank(reqBody);
        const savedBank = await newBank.save();
        return NextResponse.json({
            success: true,
            savedBank,
        });
    }
    catch (error) {
        return NextResponse.json({ message: "Error creating bank" }, { status: 500 });
    }

}
