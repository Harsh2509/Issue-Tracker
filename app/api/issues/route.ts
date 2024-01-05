import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchema";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = createIssueSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(result.error.flatten(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET() {
  const issues = await prisma.issue.findMany();
  return NextResponse.json(issues, { status: 200 });
}
