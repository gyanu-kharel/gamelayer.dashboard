import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Column } from "./types"

interface AddColumnDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddColumn: (column: Omit<Column, "tasks">) => void
}

export function AddColumnDialog({ open, onOpenChange, onAddColumn }: AddColumnDialogProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = title.toLowerCase().replace(/\s+/g, "-")
    onAddColumn({
      id,
      title,
    })
    setTitle("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Column</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Column Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., In Review"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Column
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

