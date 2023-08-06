"use client";

import { swalError } from "@/helper/swal";
import { GOOGLELOGIN } from "@/queries/user";
import { useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Loading from "@/components/loader";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function GoogleForm(): JSX.Element {
  const router = useRouter();
  const { pending } = useFormStatus();

  const [load, setLoad] = useState<boolean>(false);
  const [googleResponse, setGoogleResponse] = useState<string>("");

  useEffect(() => {
    setLoad(true);
  }, []);

  const [googleLogin, { loading }] = useMutation(GOOGLELOGIN, {
    onError(error) {
      swalError("Failed sign in with google");
    },
    async onCompleted(data, clientOptions) {
      await signIn("credentials", {
        access_token: data.googleLogin.access_token,
        redirect: false,
      });
      router.replace("/");
    },
  });

  const googleSubmit = async (response: CredentialResponse) => {
    setGoogleResponse(response.credential as string);

    await googleLogin({
      context: {
        headers: {
          access_token: googleResponse,
        },
      },
    });
  };
  return (
    <>
      {loading || pending ? (
        <Loading type="ball" />
      ) : (
        load && (
          <GoogleLogin
            useOneTap
            onSuccess={googleSubmit}
            onError={() => {
              swalError("Failed sign in with google");
            }}
            text="signin_with"
            shape="circle"
            size="medium"
            cancel_on_tap_outside={true}
          />
        )
      )}
    </>
  );
}
