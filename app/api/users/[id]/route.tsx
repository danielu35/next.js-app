import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch data from DB
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  // If not found, return 404 error
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // Else return data
  return NextResponse.json(user);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Validate the request body
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    // If the request body is invalid, return a 400 error
    return NextResponse.json(validation.error.errors, { status: 400 });

  // Fetch use with given id
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  // If user does not exist, return 400
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 400 });

  // Update user
  const update = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  // Return the updated user
  return NextResponse.json(update, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch user from DB
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  // If not found, return 404
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  // Delete the user
  await prisma.user.delete({
    where: { id: user.id },
  });
  // Return 200
  return NextResponse.json({}, { status: 200 });
}
