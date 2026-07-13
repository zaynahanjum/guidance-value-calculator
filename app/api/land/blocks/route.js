import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

    const village = request.nextUrl.searchParams.get("village");
    const ward = request.nextUrl.searchParams.get("ward");

    const result = await pool.query(
        `SELECT DISTINCT block
         FROM land
         WHERE village = $1
         AND ward = $2
         ORDER BY block`,
        [village, ward]
    );

    return NextResponse.json(result.rows);
}