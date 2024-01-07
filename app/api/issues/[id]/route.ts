import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);
  if (!id || isNaN(id)) {
    return NextResponse.json(
      { message: "Incorrect id format" },
      { status: 400 }
    );
  }
  const issue = await prisma.issue.findFirst({ where: { id } });
  if (issue) {
    return NextResponse.json(issue);
  } else {
    return NextResponse.json({ message: "Issue not found." }, { status: 404 });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const body = await req.json();
  const id = parseInt(context.params.id);
  try {
    await prisma.issue.update({
      where: { id },
      data: { description: body.description, status: body.option },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Unable to update the description" },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: "Updated the description" });
}
