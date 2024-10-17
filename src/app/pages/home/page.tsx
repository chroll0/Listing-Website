"use client";
import { useEffect, useState } from "react";
import ListingCard from "@/components/ListingCard";
import Search from "@/components/Search";
import Link from "next/link";
import axios from "axios";
import { Listing } from "@/types/listing";
import { Filters } from "@/types/filters";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const HomePage = () => {
  const [data, setData] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    region: null,
    price: { min: null, max: null },
    area: { min: null, max: null },
    bedrooms: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}real-estates`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="paddingX paddingY">
      <Search filters={filters} setFilters={setFilters} />
      {loading ? (
        <span className="text-[20px] font-medium">Loading...</span>
      ) : error ? (
        <span className="text-red-500">{error}</span>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-4 gap-5 justify-center">
          {data
            .filter((item) => {
              // Filter based on region
              const matchesRegion =
                filters.region === null ||
                item.city.region.name === filters.region;

              // Filter based on price
              const matchesPrice =
                (filters.price.min === null ||
                  item.price >= filters.price.min) &&
                (filters.price.max === null || item.price <= filters.price.max);

              // Filter based on area
              const matchesArea =
                (filters.area.min === null || item.area >= filters.area.min) &&
                (filters.area.max === null || item.area <= filters.area.max);

              // Filter based on bedrooms
              const matchesBedrooms =
                filters.bedrooms === null || item.bedrooms === filters.bedrooms;

              // Return true if all criteria match
              return (
                matchesRegion && matchesPrice && matchesArea && matchesBedrooms
              );
            })
            .map((item) => (
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
