export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <section>{children}</section>;
}
