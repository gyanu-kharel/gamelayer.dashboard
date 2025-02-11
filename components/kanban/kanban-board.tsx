"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./kanban-column";
import { TaskDialog } from "./task-dialog";
import { AddTaskDialog } from "./add-task-dialog";
import { AddColumnDialog } from "./add-column-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskCard } from "./task-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Column, ColumnType, Task, User } from "./types";

// Initial columns data
const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Research competitors",
        description: "Analyze top 5 competitors in the market",
        status: "todo",
        priority: "high",
        assignedTo: null,
        createdAt: new Date().toISOString(),
        comments: [],
        dueDate: null
      },
      {
        id: "2",
        title: "Design system",
        description: "Create a consistent design system for the application",
        status: "todo",
        priority: "medium",
        assignedTo: null,
        createdAt: new Date().toISOString(),
        comments: [],
        dueDate: null
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "User authentication",
        description: "Implement user authentication and authorization",
        status: "in-progress",
        priority: "high",
        assignedTo: null,
        createdAt: new Date().toISOString(),
        comments: [
          {
            id: "1",
            content: "Should we use JWT or session-based auth?",
            author: "Alice",
            createdAt: new Date().toISOString(),
          },
        ],
        dueDate: null
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "4",
        title: "Project setup",
        description: "Initialize project and set up development environment",
        status: "done",
        priority: "low",
        assignedTo: null,
        createdAt: new Date().toISOString(),
        comments: [],
        dueDate: null
      },
    ],
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isAddColumnDialogOpen, setIsAddColumnDialogOpen] = useState(false);
  const [columnToDelete, setColumnToDelete] = useState<Column | null>(null);

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersResp = await fetch("/api/users");
    setUsers(await usersResp.json());

     const tasksResp = await fetch('/api/tasks');

     setColumns(await tasksResp.json())
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    const activeId = active.id;

    // Check if it's a task being dragged
    const task = findTask(activeId);
    if (task) {
      setActiveTask(task);
      return;
    }

    // Check if it's a column being dragged
    const column = columns.find((col) => col.id === activeId);
    if (column) {
      setActiveColumn(column);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Handle column reordering
    if (activeColumn) {
      if (activeId !== overId) {
        setColumns((columns) => {
          const oldIndex = columns.findIndex((col) => col.id === activeId);
          const newIndex = columns.findIndex((col) => col.id === overId);
          return arrayMove(columns, oldIndex, newIndex);
        });
      }
      setActiveColumn(null);
      return;
    }

    // Handle task movement
    const activeTask = findTask(activeId);
    const overColumn = columns.find((col) => col.id === overId);

    if (!activeTask || !overColumn) return;

    setColumns((columns) => {
      // Remove task from old column
      const oldColumn = columns.find((col) =>
        col.tasks.some((task) => task.id === activeTask.id)
      );
      if (!oldColumn) return columns;

      const newColumns = columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((task) => task.id !== activeTask.id),
      }));

      // Add task to new column
      return newColumns.map((col) => {
        if (col.id === overColumn.id) {
          return {
            ...col,
            tasks: [
              ...col.tasks,
              { ...activeTask, status: col.id as ColumnType },
            ],
          };
        }
        return col;
      });
    });

    setActiveTask(null);
  };

  const findTask = (taskId: string): Task | null => {
    for (const column of columns) {
      const task = column.tasks.find((task) => task.id === taskId);
      if (task) return task;
    }
    return null;
  };

  const handleAddTask = (newTask: Omit<Task, "id" | "comments">) => {
    const task: Task = {
      ...newTask,
      id: Math.random().toString(36).substr(2, 9),
      comments: [],
    };

    setColumns((columns) =>
      columns.map((col) => {
        if (col.id === task.title) {
          return {
            ...col,
            tasks: [...col.tasks, task],
          };
        }
        return col;
      })
    );
  };

  const handleAddComment = (taskId: string, content: string) => {
    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      author: "You",
      createdAt: new Date().toISOString(),
    };

    setColumns((columns) =>
      columns.map((col) => ({
        ...col,
        tasks: col.tasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              comments: [...task.comments, comment],
            };
          }
          return task;
        }),
      }))
    );

    // Update selected task if it's currently being viewed
    if (selectedTask?.id === taskId) {
      setSelectedTask((task) =>
        task
          ? {
              ...task,
              comments: [...task.comments, comment],
            }
          : null
      );
    }
  };

  const handleAddColumn = (newColumn: Omit<Column, "tasks">) => {
    setColumns((columns) => [
      ...columns,
      {
        ...newColumn,
        tasks: [],
      },
    ]);
  };

  const handleDeleteColumn = (column: Column) => {
    setColumnToDelete(column);
  };

  const confirmDeleteColumn = () => {
    if (columnToDelete) {
      setColumns((columns) =>
        columns.filter((col) => col.id !== columnToDelete.id)
      );
      setColumnToDelete(null);
    }
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        tasks: column.tasks.map((task) =>
          task.id === taskId ? { ...task, ...updates } : task
        ),
      }))
    );

    // Update selected task if it's currently being viewed
    if (selectedTask?.id === taskId) {
      setSelectedTask((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsAddTaskDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsAddColumnDialogOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Column
          </Button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 flex gap-4 overflow-x-auto">
          <SortableContext
            items={columns.map((col) => col.id)}
            strategy={horizontalListSortingStrategy}
          >
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                onTaskClick={(task) => {
                  setSelectedTask(task);
                  setIsTaskDialogOpen(true);
                }}
                onDeleteColumn={() => handleDeleteColumn(column)}
              />
            ))}
          </SortableContext>
        </div>
        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} onClick={() => {}} />}
          {activeColumn && (
            <div className="w-[350px] rounded-lg bg-muted/50 p-4">
              <h3 className="font-semibold">{activeColumn.title}</h3>
            </div>
          )}
        </DragOverlay>
      </DndContext>
      <TaskDialog
        task={selectedTask}
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        onAddComment={handleAddComment}
        users={users}
        onAssignUser={(userId) => {
          if (selectedTask) {
            const user =
              userId === "unassigned"
                ? null
                : users.find((u) => u.id === userId) || null;
            handleUpdateTask(selectedTask.id, { assignedTo: user });
          }
        }}
        onUpdatePriority={(priority) => {
          if (selectedTask) {
            handleUpdateTask(selectedTask.id, { priority });
          }
        }}
      />
      <AddTaskDialog
        open={isAddTaskDialogOpen}
        onOpenChange={setIsAddTaskDialogOpen}
        onAddTask={handleAddTask}
        users={users}
        columns={columns}
      />
      <AddColumnDialog
        open={isAddColumnDialogOpen}
        onOpenChange={setIsAddColumnDialogOpen}
        onAddColumn={handleAddColumn}
      />
      <AlertDialog
        open={!!columnToDelete}
        onOpenChange={() => setColumnToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Column</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this column? All tasks in this
              column will be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteColumn}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
