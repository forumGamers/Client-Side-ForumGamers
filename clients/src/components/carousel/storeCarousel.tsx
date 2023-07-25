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

export default function StoreSection({
  data,
}: {
  data: storeData[];
}): JSX.Element {
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
