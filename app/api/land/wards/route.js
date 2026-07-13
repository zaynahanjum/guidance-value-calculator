import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

    const village = request.nextUrl.searchParams.get("village");

    const result = await pool.query(
        `SELECT DISTINCT ward
         FROM land
         WHERE village = $1
         ORDER BY ward`,
        [village]
    );

    return NextResponse.json(result.rows);
}