import connect from "@/lib/data";
import { NextResponse, NextRequest } from "next/server";
import { User } from "@/models/users";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'; // Fixed require() style import



export async function POST(request: NextRequest) {
  const { name, phoneNumber, password } = await request.json();

  try {
    await connect();

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phoneNumber,
      password: hashedPassword,
      role: "user",
    });
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    newUser.token = token;
    localStorage.setItem('token', token);
    
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
export async function GET() {
  await connect();
  try {
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (err: unknown) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { message: "Error fetching users" },
      { status: 500 }
    );
  }
}