import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { village, ward, block, street, area } = await request.json();

    const result = await pool.query(
        `SELECT guidance_value
         FROM land
         WHERE village = $1
         AND ward = $2
         AND block = $3
         AND street = $4`,
        [village, ward, block, street]
    );

    const rate = Number(result.rows[0].guidance_value);
    const guidanceValue = rate * area;
    const stampDuty = guidanceValue * 0.0765;

    return NextResponse.json({
        rate,
        guidanceValue,
        stampDuty,
    });
}