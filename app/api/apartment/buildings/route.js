import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {

    const village = request.nextUrl.searchParams.get("village");

    const result = await pool.query(
        `SELECT apartment_name
         FROM apartments
         WHERE village = $1
         ORDER BY apartment_name`,
        [village]
    );

    return NextResponse.json(result.rows);
}