import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
  const items = await prisma.product.findMany();
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  // Getting the request body
  const body = await request.json();
  // Validate the request body
  const validate = schema.safeParse(body);
  // If request body is not valid, return 400 error
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  // Check to see if item already exist
  const item = await prisma.product.findUnique({ where: { name: body.name } });
  if (item)
    return NextResponse.json(
      { error: "Product already exist" },
      { status: 400 }
    );
  // Insert new item
  const createProduct = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(createProduct, { status: 201 });
}
