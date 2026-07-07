import Link from "next/link";
import { Plus, Settings, Trash2, Eye } from "lucide-react";


import { createClient } from "@/utils/supabase/server";

export default async function TemplatesPage() {
  const supabase = await createClient();
  
  // Fetch templates and their related invitations to count usage
  const { data: templatesData } = await supabase
    .from('Template')
    .select('*, invitations:Invitation(id)')
    .order('createdAt', { ascending: false });

  const templates = (templatesData || []).map(tmpl => ({
    ...tmpl,
    usage: tmpl.invitations ? tmpl.invitations.length : 0,
    type: tmpl.price ? "PREMIUM" : "FREE" // Fallback if type doesn't exist
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Template Management</h1>
          <p className="text-foreground/60 mt-1">Create and manage base templates for the visual builder.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-light transition-colors shadow-sm font-medium">
          <Plus className="w-5 h-5" />
          <span>New Template</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-secondary/50 bg-secondary/10">
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground">Usage</th>
              <th className="px-6 py-4 text-sm font-semibold text-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/30">
            {templates.map((tmpl) => (
              <tr key={tmpl.id} className="hover:bg-secondary/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{tmpl.name}</div>
                  <div className="text-xs text-foreground/50">{tmpl.id}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tmpl.status === "PUBLISHED" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                  }`}>
                    {tmpl.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tmpl.type === "PREMIUM" ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {tmpl.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-foreground/70">
                  {tmpl.usage}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 text-foreground/50 hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-secondary/30" title="Preview (Coming Soon)">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-foreground/50 hover:text-primary transition-colors bg-secondary/10 rounded-lg hover:bg-secondary/30" title="Edit Template (Coming Soon)">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-foreground/50 hover:text-red-500 transition-colors bg-secondary/10 rounded-lg hover:bg-red-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
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
