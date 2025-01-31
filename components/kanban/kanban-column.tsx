import { useDroppable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { Column, Task } from "./types"

interface KanbanColumnProps {
  column: Column
  onTaskClick: (task: Task) => void
  onDeleteColumn: () => void
}

export function KanbanColumn({ column, onTaskClick, onDeleteColumn }: KanbanColumnProps) {
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: column.id,
  })

  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const setRefs = (el: HTMLElement | null) => {
    setDroppableRef(el)
    setSortableRef(el)
  }

  return (
    <div
      ref={setRefs}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col w-full min-w-[350px] h-full gap-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">{column.title}</h2>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">{column.tasks.length} tasks</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteColumn()
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col flex-1 w-full gap-2 p-4 bg-muted/50 rounded-lg">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} />
        ))}
      </div>
    </div>
  )
}

