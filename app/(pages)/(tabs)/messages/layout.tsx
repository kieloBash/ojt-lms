import MessageSidebar from "./sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full min-h-screen">
      <MessageSidebar />
      {children}
    </section>
  );
}
