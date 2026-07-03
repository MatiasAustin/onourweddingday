import { BlockRenderer } from "@/components/blocks/BlockRenderer";
// import { prisma } from "@/lib/prisma";

interface EditorPageProps {
  params: Promise<{
    invitationId: string;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { invitationId } = await params;
  
  // In a real app, we'd fetch the sections for this invitationId from Prisma
  // const invitation = await prisma.invitation.findUnique(...)

  // For the initial scaffold, we'll mock the JSON data
  // to prove the BlockRenderer works inside the Editor canvas.
  const mockSections = [
    {
      id: "1",
      type: "hero",
      contentJSON: {
        title: "John & Jane",
        subtitle: "We're getting married!",
        date: "October 12, 2026",
        primaryImageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        layoutStyle: "centered"
      }
    }
  ];

  return (
    <div className="w-full min-h-full bg-background flex flex-col">
      {mockSections.map((section) => (
        <BlockRenderer
          key={section.id}
          type={section.type}
          contentJSON={section.contentJSON}
        />
      ))}
    </div>
  );
}
