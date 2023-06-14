export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="container">
      {children}
    </section>
  );
}
