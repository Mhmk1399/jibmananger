import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {

        const authHeader = request.headers.get("authorization");
        console.log(authHeader);
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error("No token provided");
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error("No token provided");
        }
            const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decodedToken.id;
    } catch (error:Error) {
        throw new Error("Authentication failed: " + error.message);
    }
};
