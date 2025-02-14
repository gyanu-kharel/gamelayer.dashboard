import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/database/db";

export async function GET() {
  let client;
  try {
    client = await pool.connect();

    const result = await client.query("SELECT * from Users");

    const users = result.rows;

    console.log(users)

    return NextResponse.json(users, {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(err, {
      status: 400,
    });
  } finally {
    client?.release();
  }
}
