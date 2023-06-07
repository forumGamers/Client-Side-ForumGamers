export default function StoreByIdLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <section className="container">{children}</section>;
}
