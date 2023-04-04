import { tourUrl } from "@/server/constants";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Props {
  props: {
    data: any;
    error?: {
      message: string;
    };
  };
}

export async function getServerSideProps(): Promise<Props> {
  try {
    const { data } = await axios({
      method: "GET",
      url: `${tourUrl}/game`,
      headers: {
        Origin: process.env.ORIGIN,
      },
    });

    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: null,
        error: {
          message: "Failed to fetch",
        },
      },
    };
  }
}

export default function AchievementPage({ data, error }: any): JSX.Element {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/login");
    },
  });
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {}, [status]);

  if (error) return <div>{error.message}</div>;

  return data.map((el: any) => {
    return (
      <section>
        <h1>{el.name}</h1>
      </section>
    );
  });
}
