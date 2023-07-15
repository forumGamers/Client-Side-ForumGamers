"use client";

import { useSession } from "next-auth/react";
import { CustomSession } from "@/interfaces/global";

export async function checkClientSession(
  callback: (session: CustomSession | null) => any
) {
  "use client";

  const { data: session, status } = useSession();

  if (status !== "loading") callback(session);
}
