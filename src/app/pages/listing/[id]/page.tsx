"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useEffect, useState } from "react";

import AgentInfo from "@/components/AgentInfo";
import Button from "@/components/Button";
import DeleteListing from "@/components/DeleteListing";
import { Listing } from "@/types/listing";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const ListingPage = ({ params }: { params: { id: string } }) => {
  const [item, setItem] = useState<Listing | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}real-estates/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${API_TOKEN}`,
            },
          }
        );
        setItem(response.data);
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  if (loading || error) {
    return (
      <div className="paddingX paddingY">
        {loading ? (
          <span className="text-[20px] font-medium">Loading...</span>
        ) : (
          <span className="text-red-500">{error}</span>
        )}
      </div>
    );
  }

  if (!item) {
    return (
      <div className="paddingX paddingY">
        <span className="text-[20px] font-medium">Item not found</span>
      </div>
    );
  }
  // console.log(item);

  const {
    image,
    price,
    city: {
      region: { name },
    },
    address,
    area,
    bedrooms,
    zip_code,
    description,
    created_at,
    agent,
  } = item;

  return (
    <div className="relative paddingX paddingY">
      <Link className="absolute top-10 ml-3" href="/">
        <Image src="/icons/back.png" alt="back" width={21.33} height={21.33} />
      </Link>

      <div className="flex gap-[40px]">
        <div className="flex flex-col items-end gap-2.5">
          <Image
            src={image}
            alt={image}
            width={839}
            height={21.33}
            className="rounded-t-[14px]"
          />
          <span className="text-[16px] font-normal text-text-slate">
            გამოქვეყნების თარიღი {moment(created_at).format("DD/MM/YY")}
          </span>
        </div>

        <div className="w-[503px] flex flex-col gap-[24px] pt-[30px] px-5">
          <h3 className="text-[48px] font-bold text-text-black">
            {price.toLocaleString().replace(/,/g, ", ")}₾
          </h3>
          <div className="flex flex-col gap-[16px] font-normal text-text-slate">
            <div className="flex gap-1.5 items-center">
              <div className="w-[22px]">
                <Image
                  src="/icons/location.png"
                  alt="location icon"
                  width={22}
                  height={22}
                />
              </div>
              <span className="text-[24px]">
                {name}, {address}
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="w-[22px]">
                <Image
                  src="/icons/area.png"
                  alt="area icon"
                  width={20}
                  height={20}
                />
              </div>
              <span className="text-[24px]">
                ფართობი {area} მ<sup>2</sup>
              </span>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="w-[22px]">
                <Image
                  src="/icons/bed.png"
                  alt="bed icon"
                  width={22}
                  height={22}
                />
              </div>
              <span className="text-[24px]">საძინებელი {bedrooms}</span>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="w-[22px]">
                <Image
                  src="/icons/vector.png"
                  alt="post index icon"
                  width={22}
                  height={22}
                />
              </div>
              <span className="text-[24px]">საფოსტო ინდექსი {zip_code}</span>
            </div>
          </div>
          <p className="text-[16px] font-normal text-text-slate leading-[26px]">
            {description}
          </p>
          <AgentInfo agent={agent} />
          <Button
            type="button"
            title="ლისტინგის წაშლა"
            variant="text-[12px] font-medium leading-[14.4px] text-button-gray border rounded-[8px] p-[10px]"
            action={toggleModal}
          />
        </div>
      </div>

      <DeleteListing isOpen={isOpen} onClose={toggleModal} id={params.id} />
    </div>
  );
};

export default ListingPage;
