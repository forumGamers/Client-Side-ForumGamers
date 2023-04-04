import { swalError } from "@/helper/swal";
import { VERIFYUSER } from "@/queries/user";
import "@/styles/pages/user/verify.css";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Verify() {
  const router = useRouter();

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
        <a onClick={() => router.push("/")}>To HomePage</a>
      </p>
    </div>
  );
}
