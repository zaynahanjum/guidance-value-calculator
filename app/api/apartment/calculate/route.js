import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { village, apartment, area } = await request.json();

    const result = await pool.query(
        `SELECT guidance_value
         FROM apartments
         WHERE village = $1
         AND apartment_name = $2`,
        [village, apartment]
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