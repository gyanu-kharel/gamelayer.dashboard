import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import type { Priority, TaskStatus, User } from "./types";
  
  interface StatusSelectProps {
    statuses: TaskStatus[];
    value: number | undefined | null;
    onValueChange: (value: number) => void;
  }
  
  export function StatusSelect({ statuses, value, onValueChange }: StatusSelectProps) {
  
    return (
      <Select value={value} onValueChange={(e) => onValueChange(Number(e))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Optional">
            {value && value !== null ? (
              <div className="flex items-center gap-2">
                <span>{statuses.find((u) => u.statusid === value)?.statusname}</span>
              </div>
            ) : (
              "Optional"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="unassigned">Unassigned</SelectItem>
          {statuses.map((status) => (
            <SelectItem key={status.statusid} value={status.statusid}>
              {status.statusname}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }