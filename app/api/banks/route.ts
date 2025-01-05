import  { bank }  from "@/models/bank"
import connect from "@/lib/data"
import { NextResponse,NextRequest } from "next/server";
import { use } from "react";
import { getDataFromToken } from "@/lib/getDataFromToken";


export async function GET(req: NextRequest) {
    try {
        await connect();
        const id= await getDataFromToken(req);
        const banks = await bank.find({user:id}).populate('user');
        return NextResponse.json(banks);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching banks" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connect();
        const id= await getDataFromToken(req);
        if (!id) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        const reqBody = await req.json();
        const newBank = new bank({
            ...reqBody,
            user:id
        });
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
