import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, MessageSquare } from "lucide-react"
import { UserSelect } from "./user-select"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Task, User } from "./types"
import { Input } from "../ui/input"

interface TaskDialogProps {
  task: Task | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddComment: (taskId: string, comment: string) => void
  users: User[]
  onAssignUser: (userId: string) => void
  onUpdatePriority: (priority: Task["priority"]) => void
}

export function TaskDialog({
  task,
  open,
  onOpenChange,
  onAddComment,
  users,
  onAssignUser,
  onUpdatePriority,
}: TaskDialogProps) {
  const [newComment, setNewComment] = useState("")

  if (!task) return null

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(task.id, newComment)
      setNewComment("")
    }
  }

  const priorityColor = {
    low: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    high: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">{task.title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-6 h-full mt-4">
          <div className="flex-1 min-w-0">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{task.status}</Badge>
                <Badge variant="secondary" className={priorityColor[task.priority]}>
                  {task.priority} priority
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Description</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">{task.description}</p>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2" />
                Created{" "}
                {formatDistanceToNow(new Date(task.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Comments</h3>
                  <Badge variant="secondary" className="rounded-full">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    {task.comments.length}
                  </Badge>
                </div>
                <Card>
                  <CardContent className="p-3 space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end">
                      <Button size="sm" onClick={handleAddComment} disabled={!newComment.trim()}>
                        Comment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                <ScrollArea className="h-[300px] pr-4 -mr-4">
                  <div className="space-y-4">
                    {task.comments.map((comment) => (
                      <Card key={comment.id}>
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={`/placeholder.svg?text=${comment.author}`} />
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <CardTitle className="text-sm font-medium">{comment.author}</CardTitle>
                            <CardDescription className="text-xs">
                              {formatDistanceToNow(new Date(comment.createdAt), {
                                addSuffix: true,
                              })}
                            </CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 space-y-6">
          <div className="space-y-2">
              <h3 className="font-semibold">Due Date</h3>
              <Input type="text" value={task.dueDate || "not available"} />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Assignee</h3>
              <UserSelect users={users} value={task.assignedTo?.id || "unassigned"} onValueChange={onAssignUser} />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Priority</h3>
              <Select value={task.priority} onValueChange={(value) => onUpdatePriority(value as Task["priority"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Card>
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-sm">Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-sm text-muted-foreground">
                  <p>{task.assignedTo ? `Assigned to ${task.assignedTo.name}` : "No assignee"}</p>
                  <p>{task.comments.length} comments</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

