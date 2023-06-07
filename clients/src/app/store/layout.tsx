export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <section className="container">{children}</section>;
}
