import { bank } from "@/models/bank"
import connect from "@/lib/data"
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
    try {
        await connect();
        const banks = await bank.find();
        return NextResponse.json({
            success: true,
            banks,
        });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
};

export const DELETE = async () => {
    try {
        await connect();
        const banks = await bank.find();
        return NextResponse.json({
            success: true,
            banks,
        });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
};

export async function PATCh(req: NextRequest) {
    try {
        await connect();
        const reqBody = await req.json();
        const newBank = await bank.findByIdAndUpdate(reqBody.id, reqBody);
        const savedBank = await newBank.save();
        return NextResponse.json({
            success: true,
            savedBank,
        });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
}