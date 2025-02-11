import pool from "@/app/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  let client;
  try {
    client = await pool.connect();

    const query = await client.query("SELECT * from priorities");

    const priorities = query.rows;

    console.log(JSON.stringify(priorities));

    return NextResponse.json(priorities, {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err, {
      status: 400,
    });
  } finally {
    client?.release();
  }
}
