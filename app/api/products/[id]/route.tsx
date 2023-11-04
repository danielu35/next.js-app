import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch the product from DB
  const item = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  // If item not found, return 404 error
  if (!item)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  // Else return the found item
  return NextResponse.json(item);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Receive the request body
  const body = await request.json();
  // Validate the request body
  const validation = schema.safeParse(body);
  // If the request body is invalid, return 400 error
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  // Fetch item with given Id
  const item = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });
  // If user does not exist return 400 error
  if (!item)
    return NextResponse.json({ error: "Product not found" }, { status: 400 });
  // Update the item
  const updateItem = await prisma.product.update({
    where: { id: item.id },
    data: { price: body.price },
  });
  return NextResponse.json(updateItem, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Fetch the item from the DB
  const item = await prisma.product.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  // If not found, return 404 error
  if (!item)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  // Send DELETE command
  await prisma.product.delete({ where: { id: item.id } });
  // Return 200
  return NextResponse.json({}, { status: 200 });
}
