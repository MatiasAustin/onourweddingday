import { EditorCanvas } from "@/components/editor/EditorCanvas";

interface EditorPageProps {
  params: Promise<{
    invitationId: string;
  }>;
}

export default async function EditorPage({ params }: EditorPageProps) {
  const { invitationId } = await params;
  
  // Real app: fetch initial DB data here, and pass it to a Client Provider
  // However, for this scaffold, the EditorProvider in layout.tsx provides initial mock state.

  return <EditorCanvas />;
}
