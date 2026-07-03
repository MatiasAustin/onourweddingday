import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { EditorProvider } from "@/components/editor/EditorContext";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // The Visual Builder Layout has the Sidebar on the left
  // and the live preview iframe/canvas on the right
  return (
    <EditorProvider>
      <div className="flex h-screen w-full overflow-hidden bg-secondary/20">
        <EditorSidebar />
        <main className="flex-1 overflow-hidden relative">
          <div className="absolute inset-0 p-8 flex items-center justify-center">
            {/* The canvas area where the invitation is previewed */}
            <div className="w-full max-w-[400px] h-full max-h-[850px] bg-white rounded-[40px] shadow-2xl border-[8px] border-gray-900 overflow-hidden relative">
               {/* Notch simulation for realism */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-3xl z-50"></div>
               
               {/* The actual live preview content */}
               <div className="w-full h-full overflow-y-auto no-scrollbar">
                  {children}
               </div>
            </div>
          </div>
        </main>
      </div>
    </EditorProvider>
  );
}
