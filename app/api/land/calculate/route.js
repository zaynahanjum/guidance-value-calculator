import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request) {

    const { village, ward, block, street, area, unit } = await request.json();

    const result = await pool.query(
        `SELECT guidance_value
         FROM land
         WHERE village = $1
         AND ward = $2
         AND block = $3
         AND street = $4`,
        [village, ward, block, street]
    );
    console.log("Area:", area);
    console.log("Unit:", unit);
    let areaInSqM = Number(area);

    switch (unit) {
        case "sqm":
            break;

        case "sqft":
            areaInSqM *= 0.092903;
            break;

        case "cent":
            areaInSqM *= 40.4686;
            break;

        case "gunta":
            areaInSqM *= 101.1714;
            break;

        case "acre":
            areaInSqM *= 4046.856;
            break;

        default:
            break;
    }

    const rate = Number(result.rows[0].guidance_value);
    console.log(rate, areaInSqM)
    const guidanceValue = rate * areaInSqM;
    console.log(guidanceValue)
    const stampDuty = guidanceValue * 0.076;

    return NextResponse.json({
        rate,
        guidanceValue,
        stampDuty,
    });
}