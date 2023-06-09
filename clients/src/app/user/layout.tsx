import Navbar, { DropDown } from "@/components/navbar";

const dropdown: DropDown[] = [
  {
    href: "/",
    name: "Homepage",
  },
  {
    href: "/user/my-store",
    name: "store",
  },
  {
    href: "/user/myAchievement",
    name: "achievement",
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <section className="container">
      <Navbar isLoggedUser={true} dropdown={dropdown} />
      {children}
    </section>
  );
}
