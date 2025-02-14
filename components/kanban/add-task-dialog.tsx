import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Column, User, TaskStatus, Priority } from "./types";
import { UserSelect } from "./user-select";
import { PrioritySelect } from "./priority-select";
import { StatusSelect } from "./status-select";

interface AddTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (data: AddTaskFormData) => void;
  users: User[];
  columns: Column[];
  statuses: TaskStatus[];
  priorities: Priority[];
}

export type AddTaskFormData = {
  title: string;
  description: string;
  status: number;
  priority: number;
  assignedTo: number;
  dueDate: string;
};

export function AddTaskDialog({
  open,
  onOpenChange,
  onAddTask,
  users,
  columns,
  statuses,
  priorities,
}: AddTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [priority, setPriority] = useState<number | null>(null);
  const [assignedToId, setAssignedToId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(title, description, status, priority, assignedToId, dueDate);

    const formData: AddTaskFormData = {
      title: title,
      description: description,
      assignedTo: assignedToId!,
      status: status!,
      priority: priority!,
      dueDate: dueDate,
    };
    onAddTask(formData);
    setTitle("");
    setDescription("");
    setStatus(null);
    setPriority(null);
    setAssignedToId(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Status
              </label>
              <StatusSelect
                statuses={statuses}
                value={status}
                onValueChange={setStatus}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="priority" className="text-sm font-medium">
                Priority
              </label>
              <PrioritySelect
                priorities={priorities}
                value={priority}
                onValueChange={setPriority}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Assigned To</label>
            <UserSelect
              users={users}
              value={assignedToId}
              onValueChange={(e) => setAssignedToId(Number(e))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Task
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
