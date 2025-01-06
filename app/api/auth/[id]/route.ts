import { User } from "@/models/users";
import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";

type OperationDetails = {
  message?: string;
  error?: Error;
  data?: Record<string, unknown>;
};

const logOperation = (
  operation: string,
  userId: string,
  details?: OperationDetails
) => {
  console.log(
    `[${new Date().toISOString()}] ${operation} - User ID: ${userId}`
  );
  if (details) {
    console.log("Details:", JSON.stringify(details, null, 2));
  }
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const userId = params.id;
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.log("User found:", user);

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
