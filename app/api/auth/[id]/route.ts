import { User } from "@/models/users";
import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { getDataFromToken } from "@/lib/getDataFromToken";
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






