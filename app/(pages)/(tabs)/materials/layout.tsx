export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative flex flex-1 w-full h-full bg-white">
      <article className="flex items-start justify-start flex-1">
        {children}
      </article>
    </section>
  );
}
