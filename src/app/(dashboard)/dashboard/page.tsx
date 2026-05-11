import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Layout, Globe, Users, TrendingUp, Settings } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const stats = [
    { title: "Total Projects", value: "12", icon: Layout, color: "text-blue-500" },
    { title: "Active Sites", value: "8", icon: Globe, color: "text-green-500" },
    { title: "Total Visitors", value: "2.4k", icon: Users, color: "text-purple-500" },
    { title: "Growth", value: "+14%", icon: TrendingUp, color: "text-orange-500" },
  ];

  const recentProjects = [
    { id: "1", name: "E-commerce Store", status: "Published", updated: "2 hours ago" },
    { id: "2", name: "Portfolio Website", status: "Draft", updated: "Yesterday" },
    { id: "3", name: "Marketing Landing Page", status: "Published", updated: "3 days ago" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit">Welcome back, John</h1>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your projects today.</p>
        </div>
        <Button className="rounded-lg shadow-lg shadow-primary/20" asChild>
          <Link href="/dashboard/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm bg-background/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-outfit">Recent Projects</CardTitle>
            <CardDescription>You have 3 active projects this week.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 rounded-xl border bg-muted/20 hover:bg-muted/40 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Layout className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-xs text-muted-foreground">Updated {project.updated}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`text-xs px-2 py-1 rounded-full font-medium ${
                      project.status === "Published" ? "bg-green-500/10 text-green-600" : "bg-orange-500/10 text-orange-600"
                    }`}>
                      {project.status}
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 px-0 text-primary" asChild>
              <Link href="/dashboard/projects">View all projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-background/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-outfit">Quick Actions</CardTitle>
            <CardDescription>Common tasks you might need.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-sm" asChild>
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Globe className="mr-2 h-4 w-4" />
              Manage Domains
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Plus className="mr-2 h-4 w-4" />
              Invite Team Member
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
