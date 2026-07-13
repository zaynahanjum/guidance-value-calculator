import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

    const village = request.nextUrl.searchParams.get("village");
    const ward = request.nextUrl.searchParams.get("ward");
    const block = request.nextUrl.searchParams.get("block");

    const result = await pool.query(
        `SELECT DISTINCT street
         FROM land
         WHERE village = $1
         AND ward = $2
         AND block = $3
         ORDER BY street`,
        [village, ward, block]
    );

    return NextResponse.json(result.rows);
}