import { BudgetItem } from "@/models/budget";
import connect from "@/lib/data";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const budgetId = params.id;
        const budget = await BudgetItem.findById(budgetId);
        if (!budget) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }
        return NextResponse.json({ budget }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch budget" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const budgetId = params.id;
        await BudgetItem.findByIdAndDelete(budgetId);
        return NextResponse.json({ message: "Budget deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete budget" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connect();
        const budgetId = params.id;
        const reqBody = await request.json();
        const updatedBudget = await BudgetItem.findByIdAndUpdate(budgetId, reqBody, { new: true });
        if (!updatedBudget) {
            return NextResponse.json({ error: "Budget not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Budget updated successfully", budget: updatedBudget }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to update budget" }, { status: 500 }
        );
    }
}
