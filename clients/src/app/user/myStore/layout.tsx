import Navbar from "@/components/navbar";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <Navbar
        isLoggedUser={true}
        dropdown={[
          {
            href: "/",
            name: "HomePage",
          },
        ]}
      />
      {children}
    </>
  );
}
