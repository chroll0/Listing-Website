import { ListingCardProps } from "@/types/listing";
import Image from "next/image";
import Link from "next/link";
import data from "@/data/data.json";

const Listing = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const item = data.find((d) => d.id === id) || null;

  return (
    <div className="relative paddingX paddingY">
      <Link className="absolute top-10" href="/">
        <Image src="/icons/back.png" alt="back" width={21.33} height={21.33} />
      </Link>

      {item ? (
        <div>
          <h3>{item.price} USD</h3>
          <p>{item.region}</p>
          <p>{item.address}</p>
          {/* Add more fields as needed */}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Listing;
