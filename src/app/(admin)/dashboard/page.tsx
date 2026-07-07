import { Users, LayoutTemplate, Activity, Eye } from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  // In a real app we'd fetch actual stats from Supabase
  // const { count: userCount } = await supabase.from('User').select('*', { count: 'exact', head: true });
  
  const stats = [
    { name: "Total Users", value: "2,405", icon: Users, change: "+4.75%", changeType: "positive" },
    { name: "Active Invitations", value: "842", icon: Activity, change: "+54.02%", changeType: "positive" },
    { name: "Templates Available", value: "48", icon: LayoutTemplate, change: "+2", changeType: "neutral" },
    { name: "Total Page Views", value: "142.8k", icon: Eye, change: "+12.30%", changeType: "positive" },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-foreground mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-secondary/50">
            <div className="flex items-center">
              <div className="p-2 bg-secondary/30 rounded-lg">
                <stat.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div className="ml-4 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-foreground/60">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-foreground">{stat.value}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === "positive" ? "text-green-600" : 
                      stat.changeType === "negative" ? "text-red-600" : "text-gray-500"
                    }`}>
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-secondary/50 p-6 shadow-sm h-96 flex items-center justify-center">
          <p className="text-foreground/50 font-medium">Recent Activity Chart Placeholder</p>
        </div>
        <div className="bg-white rounded-2xl border border-secondary/50 p-6 shadow-sm h-96 flex items-center justify-center">
          <p className="text-foreground/50 font-medium">Popular Templates Placeholder</p>
        </div>
      </div>
    </div>
  );
}
