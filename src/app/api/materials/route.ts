import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
    const material = await prisma.material.findMany()

    return NextResponse.json(material)
}