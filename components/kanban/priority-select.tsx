import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import type { Priority, User } from "./types";
  
  interface PrioritySelectProps {
    priorities: Priority[];
    value: number | undefined | null;
    onValueChange: (value: number) => void;
  }
  
  export function PrioritySelect({ priorities, value, onValueChange }: PrioritySelectProps) {
  
    return (
      <Select value={value} onValueChange={(e) => onValueChange(Number(e))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Optional">
            {value && value !== null ? (
              <div className="flex items-center gap-2">
                <span>{priorities.find((u) => u.priorityid === value)?.priorityname}</span>
              </div>
            ) : (
              "Optional"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {priorities.map((user) => (
            <SelectItem key={user.priorityid} value={user.priorityid}>
              {user.priorityname}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }