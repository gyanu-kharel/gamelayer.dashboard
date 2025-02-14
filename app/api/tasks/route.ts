import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/database/db";

export async function GET() {
  let client;
  try {
    client = await pool.connect();

    const query = `WITH TasksData AS (
      SELECT
          t.TaskId AS id,
          t.Title AS title,
          t.Description AS description,
          ts.StatusName AS status,
          p.PriorityName AS priority,
          t.CreatedAt AS createdAt,
          '[]'::json AS comments,
          t.DueDate AS dueDate,
          ts.StatusName AS status_category
      FROM
          Tasks t
      JOIN
          TaskStatuses ts ON t.StatusId = ts.StatusId
      LEFT JOIN
          Priorities p ON t.PriorityId = p.PriorityId
      LEFT JOIN
          Users u ON t.AssigneeId = u.UserId
  ),
  Categories AS (
      SELECT DISTINCT StatusId, StatusName FROM TaskStatuses ORDER BY StatusId ASC
  )
  SELECT
      c.StatusName AS id,
      c.StatusName AS title,
      COALESCE(
          json_agg(
              json_build_object(
                  'id', td.id,
                  'title', td.title,
                  'description', td.description,
                  'status', td.status,
                  'priority', td.priority,
                  'createdAt', td.createdAt,
                  'comments', td.comments,
                  'dueDate', td.dueDate
              ) 
              ORDER BY td.createdAt
          ) FILTER (WHERE td.id IS NOT NULL),  -- Filter out NULL tasks
          '[]'::json
      ) AS tasks
  FROM Categories c
  LEFT JOIN TasksData td ON c.StatusName = td.status_category
  GROUP BY c.StatusId, c.StatusName
  ORDER BY c.StatusId ASC`;
  


    const result = await client.query(query);

    const tasks = result.rows;

    console.log(tasks)

    return NextResponse.json(tasks, {
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
