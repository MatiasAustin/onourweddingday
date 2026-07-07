import { EditorCanvas } from "@/components/editor/EditorCanvas";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import ThreeDEditor from "@/components/3d-invitation/ThreeDEditor";

interface EditorPageProps {
  params: Promise<{
    invitationId: string;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { invitationId } = await params;
  
  const supabase = await createClient();
  const { data: invitation } = await supabase.from('Invitation').select('*').eq('id', invitationId).single();
  
  if (!invitation) notFound();

  // If this invitation uses the cinematic 3D template, use the specialized editor
  if (invitation.templateId === "elegance-3d") {
    return <ThreeDEditor invitation={invitation} />;
  }

  // Real app: fetch initial DB data here, and pass it to a Client Provider
  // However, for this scaffold, the EditorProvider in layout.tsx provides initial mock state.

  return <EditorCanvas />;
}
