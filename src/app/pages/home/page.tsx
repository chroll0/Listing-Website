import ListingCard from "@/components/ListingCard";
import Search from "@/components/Search";
import Link from "next/link";
import data from "@/data/data.json";

const HomePage = () => {
  return (
    <div className="paddingX paddingY">
      <Search />
      {data ? (
        <div className="grid grid-cols-4 gap-5 justify-center">
          {data.map((item) => (
            <Link href={`/pages/listing/${item.id}`} key={item.id}>
              <ListingCard data={item} />
            </Link>
          ))}
        </div>
      ) : (
        <span className="text-[20px] font-medium">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </span>
      )}
    </div>
  );
};

export default HomePage;
