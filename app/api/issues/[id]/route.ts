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
  let body;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!body.description || !body.option) {
    return NextResponse.json(
      { message: "Description and Options are required" },
      { status: 400 }
    );
  }

  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const updateResponse = await prisma.issue.update({
      where: { id },
      data: { description: body.description, status: body.option },
    });

    if (updateResponse) {
      return NextResponse.json({ message: "Updated the description" });
    } else {
      return NextResponse.json(
        { message: "No issue found with the given id" },
        { status: 404 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { message: "Unable to update the issue due to server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = parseInt(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  try {
    const deleteResponse = await prisma.issue.delete({ where: { id } });

    if (deleteResponse) {
      return NextResponse.json({ message: "Issue deleted successfully" });
    } else {
      return NextResponse.json(
        { message: "No issue found with this id" },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Unable to delete due to error: " + error.message);
    return NextResponse.json(
      { message: "Unable to delete the issue due to serve error" },
      { status: 500 }
    );
  }
}
