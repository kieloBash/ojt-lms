import Footer from "@/components/pages/home/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative flex flex-col">
      <section className="relative flex flex-1 w-full h-full">
        <article className="flex flex-col flex-1 bg-white">{children}</article>
      </section>
      <Footer />
    </main>
  );
}
