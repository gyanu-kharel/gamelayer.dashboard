import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User } from "./types"

interface UserSelectProps {
  users: User[]
  value: string | undefined | null
  onValueChange: (value: string) => void
}

export function UserSelect({ users, value, onValueChange }: UserSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Unassigned">
          {value && value !== "unassigned" ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={users.find((u) => u.id === value)?.avatar}
                  alt={users.find((u) => u.id === value)?.name}
                />
                <AvatarFallback>{users.find((u) => u.id === value)?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{users.find((u) => u.id === value)?.name}</span>
            </div>
          ) : (
            "Unassigned"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{user.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

