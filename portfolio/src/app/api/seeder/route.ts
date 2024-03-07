import { NextResponse } from "next/server";

export default function GET(request: Request) {
    return NextResponse.json("Hello World!");
}