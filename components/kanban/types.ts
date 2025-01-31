export interface User {
  id: string
  name: string
  avatar: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: ColumnType
  priority: "low" | "medium" | "high"
  createdAt: string
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

