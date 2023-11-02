import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: number };
}

export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Fetch data from DB
  // If not found, return 404 error
  // Else return data
  if (params.id > 10)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({ id: 1, name: "Daniel" });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // Validate the request body
  const body = await request.json();
  if (!body.name)
    // If the request body is invalid, return a 400 error
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  // Fetch use with given id
  if (params.id > 10)
    // If user does not exist, return 400
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  // Update user
  // Return the updated user
  return NextResponse.json({ id: 1, name: body.name });
}
