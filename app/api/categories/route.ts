import { Category } from "@/models/category";
import connect from "@/lib/data";
import { NextResponse,NextRequest } from "next/server";



export const GET = async (req: NextRequest) => {
    try {
        await connect();
        const categories = await Category.find();
        return NextResponse.json({
            success: true,
            categories,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        await connect();
        const reqBody = await req.json();
        const newCategory = new Category(reqBody);
        const savedCategory = await newCategory.save();
        return NextResponse.json({
            success: true,
            savedCategory,
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
        });
    }
};
