import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {

    const result = await pool.query(
        `SELECT DISTINCT village
         FROM apartments
         ORDER BY village`
    );

    return NextResponse.json(result.rows);
}