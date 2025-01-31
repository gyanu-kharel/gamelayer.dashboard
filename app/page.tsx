import { Boxes, CheckCircle, Users } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="12" icon={<Users className="h-4 w-4 text-muted-foreground" />} />
        <StatCard title="Total Tasks" value="34" icon={<Boxes className="h-4 w-4 text-muted-foreground" />} />
        <StatCard
          title="In Progress"
          value="8"
          icon={<Boxes className="h-4 w-4 text-muted-foreground" />}
          description="Tasks currently in progress"
        />
        <StatCard
          title="Completed"
          value="21"
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          description="Tasks completed this month"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* You can add a chart here showing task distribution across columns */}
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">{/* You can add a list of recent activities here */}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

