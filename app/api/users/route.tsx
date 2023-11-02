import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
    return NextResponse.json([
        { id: 1, name: "Daniel" },
        { id: 2, name: "Rio" }
    ]);
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    if (!body.name) return NextResponse.json({ error: "Name is required"}, { status: 400 })
    return NextResponse.json({ id: 1, name: body.name }, { status: 201});
}

export function PUT(request: NextRequest) {
    
}