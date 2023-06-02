"use client";

import { swalError } from "@/helper/swal";
import { VERIFYUSER } from "@/queries/user";
import "@/styles/pages/user/verify.css";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Verify() {
  const [token] = useMutation(VERIFYUSER, {
    onError(error, clientOptions) {
      swalError(error.message);
    },
  });

  useEffect(() => {
    (async () => {
      const query = window.location.search;
      const urlParams = new URLSearchParams(query);
      const tokenParams = urlParams.get("token");
      const session = useSession();
      console.log(session);

      await token({
        variables: {
          token: {
            token: tokenParams,
          },
        },
      });
    })();
  }, []);

  return (
    <div className="body">
      <h1>Congratulations, Your account has been actived</h1>
      <p>Thanks for using our service</p>
      <p>
        <Link href="/">To HomePage</Link>
      </p>
    </div>
  );
}
