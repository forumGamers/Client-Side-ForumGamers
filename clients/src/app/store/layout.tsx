import Navbar from "@/components/navbar";
import { checkServerSession } from "@/helper/global";
import { CustomSession } from "@/interfaces/tour";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  let userSession: CustomSession | null = null;
  await checkServerSession((session) => {
    userSession = session;
  });
  return (
    <section className="container">
      <Navbar
        dropdown={[
          {
            href: "/",
            name: "Homepage",
          },
        ]}
        isLoggedUser={userSession ? true : false}
      />
      {children}
    </section>
  );
}
