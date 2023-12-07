import LeftSidebar from "@/components/global/LeftSidebar";
import { SelectedChildProvider } from "@/components/global/context/useSelectedChild";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SelectedChildProvider>
      <section className="relative flex flex-1 w-full h-full">
        <LeftSidebar />
        <article className="flex items-center justify-center flex-[20] bg-slate-100">
          {children}
        </article>
        {/* <MiniChat /> */}
      </section>
    </SelectedChildProvider>
  );
}
