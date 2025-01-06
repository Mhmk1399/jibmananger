import { bank } from "@/models/bank";
import connect  from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function DELETE(
    request: NextRequest
     
) {
    try {
        await connect();
        const userId = await getDataFromToken(request);
        const id = await request.headers.get('id');
        await bank.findOneAndDelete({ user: userId , _id: id });
        
        return NextResponse.json({
            success: true,
            message: "Bank deleted successfully"
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        });
    }
}