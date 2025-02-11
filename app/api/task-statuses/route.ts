import pool from "@/app/database/db";
import { NextResponse } from "next/server";

export async function GET() {
  let client;

  try {
    client = await pool.connect();

    const query = await client.query("SELECT * from TaskStatuses");

    const statuses = query.rows;

    console.log(statuses)

    return NextResponse.json(statuses, {
      status: 200,
    });
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, {
      status: 400,
    });
  } finally {
    client?.release();
  }
}
