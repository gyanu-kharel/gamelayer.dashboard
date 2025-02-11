import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {title, description, statusId, priorityId, assigneeId, dueDate} = await request.json();
}

