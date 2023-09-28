export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <section className="container">{children}</section>;
}
