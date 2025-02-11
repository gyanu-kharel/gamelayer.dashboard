import { CSS } from "@dnd-kit/utilities"
import { useSortable } from "@dnd-kit/sortable"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Task } from "./types"

interface TaskCardProps {
  task: Task
  onClick: (task: Task) => void
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  console.log(task)
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const priorityColor = {
    low: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
    >
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium">{task.title}</h3>
          <Badge variant="secondary" className={priorityColor[task.priority]}>
            {task.priority}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
        <div className="flex items-center justify-between">
          {task.assignedTo ? (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignedTo.avatar} alt={task.assignedTo.name} />
              <AvatarFallback>{task.assignedTo.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <span className="text-xs text-muted-foreground">Unassigned</span>
          )}
          {/* {task.comments.length > 0 && (
            <div className="flex items-center text-muted-foreground">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span className="text-xs">{task.comments.length}</span>
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  )
}

