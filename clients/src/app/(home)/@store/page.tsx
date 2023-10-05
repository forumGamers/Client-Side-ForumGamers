import { storeData } from "@/interfaces/store";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@/components/material-tailwind";
import EmptyData from "@/components/emptyData";
import { LazyLoadImage } from "@/components/global";
import Link from "next/link";
import { client } from "@/lib/apolloClient";
import { GETSTOREDATAFORSTOREPAGE } from "@/queries/store";
import Encryption from "@/helper/encryption";

async function getStoreData(): Promise<storeData[]> {
  try {
    // const { data } = await client.query<{ getAllStore: storeData[] }>({
    //   query: GETSTOREDATAFORSTOREPAGE,
    //   variables: {
    //     query: {
    //       limit: Encryption.encrypt("6"),
    //     },
    //   },
    // });

    // return data.getAllStore;
    return [
      {
        CreatedAt: "2023-03-30T14:08:57.710477+07:00",
        ID: 1,
        StoreStatus: {
          id: 1, //ini kurang
          name: "Basic",
        },
        active: true,
        avg_rating: 5,
        image: "",
        name: "testing store",
        rating_count: 2,
        description: "", //ini kurang
        followers: 1, //ini
        Items: [], //ini
        background: "", //ini
        exp: 0, //ini
        status_id: 1, //ini
      },
      {
        CreatedAt: "2023-03-30T14:08:57.710477+07:00",
        ID: 2,
        StoreStatus: {
          id: 1,
          name: "Basic",
        },
        active: true,
        avg_rating: 5,
        image: "",
        name: "apa aja",
        rating_count: 2,
        description: "", //ini kurang
        followers: 1, //ini
        Items: [], //ini
        background: "", //ini
        exp: 0, //ini
        status_id: 1, //ini
      },
      {
        CreatedAt: "2023-03-30T14:08:57.710477+07:00",
        ID: 3,
        StoreStatus: {
          name: "Basic",
          id: 1,
        },
        active: true,
        avg_rating: 5,
        image: "",
        name: "tes123 store",
        rating_count: 2,
        description: "", //ini kurang
        followers: 1, //ini
        Items: [], //ini
        background: "", //ini
        exp: 0, //ini
        status_id: 1, //ini
      },
    ];
  } catch (err) {
    return [];
  }
}

export default async function StoreSection(): Promise<JSX.Element> {
  const data = await getStoreData();
  return (
    <>
      <div>
        {data.length ? (
          data.map((store: storeData) => (
            <Card className="w-450" key={store.ID}>
              <CardHeader shadow={false} floated={false} className="h-96">
                <LazyLoadImage
                  src={store.image}
                  className="w-full h-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <div className="flex items-center justify-between mb-2">
                  <Typography color="blue-gray" className="font-medium">
                    {store.name}
                  </Typography>
                  <Typography color="blue-gray" className="font-medium">
                    {store.avg_rating}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal opacity-75"
                >
                  {store.description}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link href={`/store/${store.ID}`}>
                  <Button
                    ripple={false}
                    fullWidth={true}
                    className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:shadow-none hover:scale-105 focus:shadow-none focus:scale-105 active:scale-100"
                  >
                    See
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <EmptyData message="Data not found" />
        )}
      </div>
    </>
  );
}
