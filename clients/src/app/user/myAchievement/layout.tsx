import Navbar from "@/components/navbar";
import { checkServerSession } from "@/helper/global";
import { CustomSession } from "@/interfaces/global";

export default async function AchievementLayout({
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
        isLoggedUser={userSession ? true : false}
        dropdown={[
          {
            href: "/",
            name: "Homepage",
          },
        ]}
      />
      {children}
    </section>
  );
}
