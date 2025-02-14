export interface User {
  userid: string
  firstname: string
  lastname: string
  email: string
}

export interface Priority {
  priorityid: number
  priorityname: string
}

export interface TaskStatus {
  statusid: number
  statusname: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: ColumnType
  priority: "low" | "medium" | "high"
  createdAt: string
  dueDate: string | null
  assignedTo: User | null
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  author: string
  createdAt: string
}

export type ColumnType = string

export interface Column {
  id: ColumnType
  title: string
  tasks: Task[]
}

