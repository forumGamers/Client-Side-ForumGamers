import { CustomSession } from "@/interfaces/global";
import NavigationBar from "../navigationBar";
import { checkServerSession } from "@/helper/global";

export default async function BasePage({
  children,
}: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  let userSession: CustomSession | null = null;
  await checkServerSession((session) => {
    userSession = session;
  });
  return (
    <>
      <main className="container">
        <NavigationBar session={userSession} />
        {children}
      </main>
      {/* {footer} */}
    </>
  );
}
