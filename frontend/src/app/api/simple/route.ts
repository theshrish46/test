import { NextResponse, NextRequest } from "next/server";
export async function GET(request: NextRequest, response: NextResponse) {
    return Response.json({ msg: 'ok' })
}

export async function POST() {
    const res = await fetch()
}