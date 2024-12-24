import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function GET() {
    return NextResponse.json(await prisma.sneaker.findMany())
}

export async function POST(req: NextRequest) {
    const data = await req.json()

    const sneaker = await prisma.sneaker.create({
        data
    })

    return NextResponse.json(sneaker)
}