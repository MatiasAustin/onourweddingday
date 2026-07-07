import { createClient } from "@/utils/supabase/server";
import { Mail, Shield, Calendar, Search } from "lucide-react";

export default async function UsersPage() {
  const supabase = await createClient();
  
  // Fetch users and their invitations to show counts
  const { data: usersData } = await supabase
    .from('User')
    .select('*, invitations:Invitation(id)')
    .order('createdAt', { ascending: false });

  const users = (usersData || []).map(u => ({
    ...u,
    invitationsCount: u.invitations ? u.invitations.length : 0
  }));

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">User Management</h1>
          <p className="text-foreground/60 mt-1">Manage platform clients and administrators.</p>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="pl-10 pr-4 py-2 bg-white border border-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 w-full sm:w-64 shadow-sm text-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-secondary/50 bg-secondary/10">
              <th className="px-6 py-4 text-sm font-semibold text-foreground">User</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Role</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Invitations</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/30">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-foreground/50">
                  No users found.
                </td>
              </tr>
            ) : users.map((u) => (
              <tr key={u.id} className="hover:bg-secondary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-serif font-medium">
                      {u.email.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium text-foreground flex items-center gap-2">
                        {u.email}
                      </div>
                      <div className="text-xs text-foreground/50 font-mono mt-0.5">{u.id}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    u.role === "ADMIN" 
                      ? "bg-purple-100 text-purple-800 border border-purple-200" 
                      : "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    {u.role === "ADMIN" ? <Shield className="w-3 h-3" /> : <Mail className="w-3 h-3" />}
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-secondary/30 text-sm font-medium text-foreground/70">
                    {u.invitationsCount}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground/70">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-foreground/40" />
                    {new Date(u.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
