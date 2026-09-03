"use client";

import { useState } from "react";
import { deleteGuestbookEntry, updateGuestList } from "@/app/actions/client";
import { Trash2, Copy, Plus, X } from "lucide-react";

interface InvitationManagerProps {
  invitationId: string;
  invitationSlug: string;
  initialGuestbook: any[];
  initialGuestList: any[];
}

export function InvitationManager({ invitationId, invitationSlug, initialGuestbook, initialGuestList }: InvitationManagerProps) {
  const [activeTab, setActiveTab] = useState<'guestbook' | 'guests'>('guestbook');
  
  // Guestbook State
  const [guestbook, setGuestbook] = useState(initialGuestbook);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Guest List State
  const [guestList, setGuestList] = useState<{ id: string, name: string }[]>(initialGuestList);
  const [newGuestName, setNewGuestName] = useState("");
  const [isSavingGuests, setIsSavingGuests] = useState(false);

  const handleDeleteWish = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    setIsDeleting(id);
    const res = await deleteGuestbookEntry(id);
    if (res.success) {
      setGuestbook(guestbook.filter(g => g.id !== id));
    } else {
      alert("Failed to delete");
    }
    setIsDeleting(null);
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    
    const newGuest = { id: Date.now().toString(), name: newGuestName.trim() };
    const updatedList = [...guestList, newGuest];
    setGuestList(updatedList);
    setNewGuestName("");
    
    // Save to DB
    setIsSavingGuests(true);
    await updateGuestList(invitationId, updatedList);
    setIsSavingGuests(false);
  };

  const handleRemoveGuest = async (id: string) => {
    const updatedList = guestList.filter(g => g.id !== id);
    setGuestList(updatedList);
    
    setIsSavingGuests(true);
    await updateGuestList(invitationId, updatedList);
    setIsSavingGuests(false);
  };

  const generateLink = (name: string) => {
    if (typeof window === 'undefined') return "";
    const baseUrl = window.location.origin;
    return `${baseUrl}/${invitationSlug}?to=${encodeURIComponent(name)}`;
  };

  const copyLink = (name: string) => {
    navigator.clipboard.writeText(generateLink(name));
    alert(`Link for ${name} copied to clipboard!`);
  };

  return (
    <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-secondary/50">
        <button 
          onClick={() => setActiveTab('guestbook')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'guestbook' ? 'border-b-2 border-primary text-primary' : 'text-foreground/60 hover:text-foreground'}`}
        >
          Guestbook Messages
        </button>
        <button 
          onClick={() => setActiveTab('guests')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'guests' ? 'border-b-2 border-primary text-primary' : 'text-foreground/60 hover:text-foreground'}`}
        >
          Guest List & Links
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'guestbook' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Manage Guestbook Messages</h2>
            {guestbook.length === 0 ? (
              <p className="text-foreground/60">No messages yet.</p>
            ) : (
              <div className="space-y-4">
                {guestbook.map(entry => (
                  <div key={entry.id} className="border border-secondary/30 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-semibold">{entry.name}</h4>
                      <p className="text-sm text-foreground/60 mb-2">Attendance: {entry.attendance} • Guests: {entry.guestsCount}</p>
                      <p className="text-sm">{entry.message}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteWish(entry.id)}
                      disabled={isDeleting === entry.id}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'guests' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Manage Guest List</h2>
            
            <form onSubmit={handleAddGuest} className="flex gap-4 mb-8">
              <input 
                type="text" 
                value={newGuestName}
                onChange={(e) => setNewGuestName(e.target.value)}
                placeholder="Enter guest name..." 
                className="flex-1 border border-secondary/50 rounded-xl px-4 py-2 focus:outline-none focus:border-primary"
              />
              <button 
                type="submit"
                disabled={!newGuestName.trim() || isSavingGuests}
                className="bg-primary text-white px-6 py-2 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                Add Guest
              </button>
            </form>

            {guestList.length === 0 ? (
              <p className="text-foreground/60">No guests added yet. Add a guest to generate a personalized link.</p>
            ) : (
              <div className="space-y-3">
                {guestList.map(guest => (
                  <div key={guest.id} className="flex items-center justify-between border border-secondary/30 rounded-xl p-4">
                    <div className="font-medium">{guest.name}</div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => copyLink(guest.name)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-secondary/50 rounded-lg hover:bg-secondary/10 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Link
                      </button>
                      <button 
                        onClick={() => handleRemoveGuest(guest.id)}
                        disabled={isSavingGuests}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
