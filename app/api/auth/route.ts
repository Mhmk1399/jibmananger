import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // Fixed require() style import
<<<<<<< Updated upstream
import { getDataFromToken } from "@/lib/getDataFromToken";
=======
>>>>>>> Stashed changes

export async function POST(request: NextRequest) {
  const { name, phoneNumber, password } = await request.json();

  try {
    await connect();
    if (!connect) {
      return NextResponse.json(
        { message: "Error connecting to database" },
        { status: 500 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phoneNumber,
      password: hashedPassword,
      role: "user",
    });
    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    newUser.token = token;
<<<<<<< Updated upstream
=======
    localStorage.setItem("token", token);
>>>>>>> Stashed changes

    await newUser.save();

    return NextResponse.json(
      {
        message: "user account created successfully",
        redirectUrl: "http://localhost:3000",
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Error creating user account:", err);
    return NextResponse.json(
      { message: "Error creating user account" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  try {
    await connect();
    if (!connect) {
      return NextResponse.json(
        { message: "Error connecting to database" },
        { status: 500 }
      );
    }
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const users = await User.findOne({});
    return NextResponse.json({ users }, { status: 200 });
  } catch (err: unknown) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}
