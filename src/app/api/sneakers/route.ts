import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: NextRequest) {
    const data = await req.json()

    const sneakers = await prisma.sneakers.create({
        data
    })

    return NextResponse.json(sneakers)
}

export async function UPDATE(req: NextRequest) {
    const data = await req.json()
    const sneakers = await req.nextUrl.searchParams.get('sneakers')

    if (sneakers) {
        const sneakers_ = await prisma.sneakers.findFirst({ where: { id: Number(sneakers) } })
        return NextResponse.json(sneakers_)
    }
}