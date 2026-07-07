import { prisma } from "@/lib/prisma";
import { InvitationsClient } from "./InvitationsClient";

export default async function InvitationsPage() {
  const invitations = await prisma.invitation.findMany({
    include: {
      user: true,
      template: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  const users = await prisma.user.findMany({
    where: {
      role: 'CLIENT'
    },
    select: { id: true, email: true }
  });

  const templates = await prisma.template.findMany({
    select: { id: true, name: true }
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Client Invitations</h1>
          <p className="text-foreground/60 mt-2">Manage live client products, create new invitations, and update statuses.</p>
        </div>
      </div>
      
      <InvitationsClient 
        initialInvitations={invitations} 
        users={users} 
        templates={templates} 
      />
    </div>
  );
}
