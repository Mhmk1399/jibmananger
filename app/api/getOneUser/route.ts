import { getDataFromToken } from "@/lib/getDataFromToken";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/users";
import bcryptjs from "bcryptjs";

interface UserUpdateData {
  name?: string;
  phoneNumber?: string;
  password?: string;
}
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

export async function GET(request: NextRequest) {
  const id = await getDataFromToken(request);
  console.log(id);

  await connect();

  try {
    const user = await User.findById(id);

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error fetching user", { status: 500 });
  }
}
export const PATCH = async (req: NextRequest) => {
  const userId = await getDataFromToken(req);
  logOperation("PATCH_ATTEMPT", userId);

  await connect();
  if (!connect) {
    logOperation("PATCH_ERROR", userId, {
      message: "Database connection failed",
    });
    return new NextResponse("Database connection error", { status: 500 });
  }

  if (!userId) {
    logOperation("PATCH_ERROR", userId, { message: "Missing user ID" });
    return new NextResponse("User ID is required", { status: 400 });
  }

  try {
    const body = await req.json();
    const { name, phoneNumber, password } = body;

    const updateData: UserUpdateData = {};

    if (name) updateData.name = name;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (password) {
      updateData.password = await bcryptjs.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      logOperation("PATCH_ERROR", userId, { message: "User not found" });
      return new NextResponse("User not found", { status: 404 });
    }

    logOperation("PATCH_SUCCESS", userId, { data: updatedUser.toObject() });
    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully",
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    logOperation("PATCH_ERROR", userId, { error: error as Error });
    return new NextResponse("Error updating user", { status: 500 });
  }
};
export async function DELETE(request: NextRequest) {
  const id = await getDataFromToken(request);

  logOperation("DELETE_ATTEMPT", id);

  await connect();
  if (!connect) {
    logOperation("DELETE_ERROR", id, { message: "Database connection failed" });
    return new NextResponse("Database connection error", { status: 500 });
  }

  if (!id) {
    logOperation("DELETE_ERROR", id, { message: "Missing user ID" });
    return new NextResponse("User ID is required", { status: 400 });
  }

  try {
    await User.findByIdAndDelete(id);
    logOperation("DELETE_SUCCESS", id);
    return new NextResponse(
      JSON.stringify({ message: "User deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    logOperation("DELETE_ERROR", id, { error: error as Error });
    return new NextResponse("Error deleting user", { status: 500 });
  }
}
