export default function AchievementLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <section className="container">{children}</section>;
}
