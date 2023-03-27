import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";
import { GETUSERDATA } from "@/queries/user";
import { useLazyQuery } from "@apollo/client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UserProfile(): JSX.Element {
  const router = useRouter();
  const [getUserData, { loading }] = useLazyQuery(GETUSERDATA, {
    onError(error) {
      swalError(error);
    },
    onCompleted(data) {
      const {
        id,
        fullName,
        exp,
        email,
        balance,
        imageUrl,
        isVerified,
        phoneNumber,
        point,
        role,
        username,
        Followings,
        StoreName,
      } = data.getUserData;

      setUser({
        id,
        fullName,
        email,
        exp,
        balance,
        imageUrl,
        isVerified,
        phoneNumber,
        point,
        role,
        username,
        Followings,
        StoreName,
      });
    },
  });

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/login");
    },
  }) as any;

  const [user, setUser] = useState({
    id: 0,
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: "",
    point: "",
    isVerified: false,
    imageUrl: "",
    balance: 0,
    StoreName: "",
    exp: 0,
    Followings: [],
  });

  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        try {
          await getUserData({
            variables: {
              accessToken: session?.user?.access_token,
            },
          });
        } catch (error) {
          swalError(error);
        }
      })();
    }
  }, [status]);

  const s = (e: any) => {
    e.preventDefault();

    signOut();
  };

  if (status === "loading" || loading) return <Loading />;
  return (
    <div>
      <p>{user.id}</p>
      <p>{user.fullName}</p>
      <p>{user.username}</p>
      <p>{user.imageUrl || "-"}</p>
      <p>{user.exp}</p>
      <p>{user.email}</p>
      <p>{user.point}</p>
      <p>{user.isVerified}</p>
      <p>{user.role}</p>
      <p>{user.balance}</p>
      <button onClick={s}>sign out</button>
    </div>
  );
}
