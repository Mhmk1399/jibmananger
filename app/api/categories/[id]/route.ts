import connect from "@/lib/data";
import { NextResponse,NextRequest } from "next/server";
import { Category } from "@/models/category";



export const GET = async (req: NextRequest,{params}:{params:{id:string}}) => {
    try {
        await connect();
        const category = await Category.findById(params.id);
        return NextResponse.json({
            success: true,
            category,
        });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest,{params}:{params:{id:string}}) => {
    try {
        await connect();
        const category = await Category.findByIdAndDelete(params.id);
        return NextResponse.json({
            success: true,
            category,
        });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
};

export const PATCh = async (req: NextRequest,{params}:{params:{id:string}}) => {
    try {
        await connect();
        const reqBody = await req.json();
        const category = await Category.findByIdAndUpdate(params.id,reqBody);
        return NextResponse.json({
            success: true,
            category,
        });
    } catch (error: unknown) {
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        }, { status: 500 });
    }
};

