"use client";

import { useState } from "react";
import { createInvitation, updateInvitationStatus } from "./actions";
import Link from "next/link";
import { Plus, Edit, Eye, Globe, Archive, Loader2 } from "lucide-react";

export function InvitationsClient({ initialInvitations, users, templates }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleStatusChange(id: string, newStatus: string) {
    setLoadingId(id);
    await updateInvitationStatus(id, newStatus);
    setLoadingId(null);
  }

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsCreating(true);
    setErrorMsg("");
    
    const formData = new FormData(e.currentTarget);
    const res = await createInvitation(formData);
    
    if (res?.error) {
      setErrorMsg(res.error);
    } else {
      setIsModalOpen(false);
      e.currentTarget.reset();
    }
    setIsCreating(false);
  }

  return (
    <div>
      {/* Action Bar */}
      <div className="mb-6 flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center hover:bg-primary-light transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Invitation
        </button>
      </div>

      {/* Invitations Table */}
      <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary/20 border-b border-secondary/50 text-sm text-foreground/60">
              <th className="px-6 py-4 font-medium">Title & Slug</th>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Template</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/30">
            {initialInvitations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-foreground/50">
                  No invitations found.
                </td>
              </tr>
            ) : initialInvitations.map((inv: any) => (
              <tr key={inv.id} className="hover:bg-secondary/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{inv.title}</div>
                  <div className="text-xs text-foreground/50">/{inv.slug}</div>
                </td>
                <td className="px-6 py-4 text-sm text-foreground/70">{inv.user.email}</td>
                <td className="px-6 py-4 text-sm text-foreground/70">{inv.template?.name || "N/A"}</td>
                <td className="px-6 py-4">
                  <select 
                    value={inv.status}
                    onChange={(e) => handleStatusChange(inv.id, e.target.value)}
                    disabled={loadingId === inv.id}
                    className={`text-xs font-medium px-3 py-1 rounded-full outline-none border cursor-pointer
                      ${inv.status === 'PUBLISHED' ? 'bg-green-100 text-green-700 border-green-200' : 
                        inv.status === 'DRAFT' ? 'bg-amber-100 text-amber-700 border-amber-200' : 
                        'bg-gray-100 text-gray-700 border-gray-200'}`}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="PUBLISHED">Published (Live)</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-3">
                    {inv.status === 'PUBLISHED' && (
                      <Link href={`/${inv.slug}`} target="_blank" className="text-foreground/50 hover:text-primary transition-colors" title="View Live">
                        <Globe className="w-4 h-4" />
                      </Link>
                    )}
                    <Link href={`/editor/${inv.id}`} className="text-foreground/50 hover:text-primary transition-colors" title="Edit in Antigravity">
                      <Edit className="w-4 h-4" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-secondary/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-medium">New Invitation</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-foreground/50 hover:text-foreground">✕</button>
            </div>
            
            {errorMsg && <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm rounded-xl">{errorMsg}</div>}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Title</label>
                <input required type="text" name="title" className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Romeo & Juliet" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">URL Slug</label>
                <input required type="text" name="slug" className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="romeo-juliet" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Client</label>
                <select required name="userId" className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select a client...</option>
                  {users.map((u: any) => (
                    <option key={u.id} value={u.id}>{u.email}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">Template</label>
                <select required name="templateId" className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/20 focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Select a template...</option>
                  {templates.map((t: any) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-medium text-foreground/70 hover:bg-secondary/50">Cancel</button>
                <button type="submit" disabled={isCreating} className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-primary-light disabled:opacity-70 flex items-center">
                  {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
