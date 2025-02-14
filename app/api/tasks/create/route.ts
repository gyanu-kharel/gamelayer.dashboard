import pool from "@/app/database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, status, priority, assignedTo, dueDate } =
    await request.json();

  console.log(title, description, status, priority, assignedTo, dueDate);

  const client = await pool.connect();

  try {
    const result = await client.query(
      `INSERT INTO Tasks (Title, Description, DueDate, AssigneeId, PriorityId, StatusId) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, description, new Date(dueDate), assignedTo, priority, status]
    );

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({}, { status: 400 });
  }
}
