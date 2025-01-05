import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/data";
import { recipient } from "@/models/recipient";
import jwt from 'jsonwebtoken';
import { getDataFromToken } from "@/lib/getDataFromToken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || '1234') as { id: string };

    const { 
      name,
      cardNumber,
      cvv2,
      expiryDate,
      shabaNumber,
      recipientName,
      recipientPhoneNumber 
    } = await request.json();

    const newRecipient = new recipient({
      name: recipientName,
      phoneNumber: recipientPhoneNumber,
      user: decoded.id,
      bankDetails: {
        bankName: name,
        cardNumber: cardNumber,
        cvv2: cvv2,
        expiryDate: expiryDate,
        shabaNumber: shabaNumber
      }
    });

    await newRecipient.save();

    return NextResponse.json({ 
      message: "Recipient added successfully",
      recipient: newRecipient 
    }, { status: 201 });

  } catch (error) {
    console.error("Error adding recipient:", error);
    return NextResponse.json({ 
      message: "Error adding recipient" 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  
  try {
    await connect();
    const id = await getDataFromToken(request);
    if (!id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const recipients = await recipient.find({ user: id });
    return NextResponse.json({ recipients }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipients:", error);
    return NextResponse.json(
      { message: "Error fetching recipients" },
      { status: 500 }
    );
  }
}