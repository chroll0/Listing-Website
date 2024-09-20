"use client";

import Image from "next/image";
import Link from "next/link";
import data from "@/data/data.json";
import AgentInfo from "@/components/AgentInfo";
import Button from "@/components/Button";
import DeleteListing from "@/components/DeleteListing";
import { useState } from "react";

const Listing = ({ params }: { params: { id: string } }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { id } = params;
  const item = data.find((d) => d.id === id) || null;

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative paddingX paddingY">
      <Link className="absolute top-10 ml-3" href="/">
        <Image src="/icons/back.png" alt="back" width={21.33} height={21.33} />
      </Link>

      {item ? (
        <div className="flex gap-[40px]">
          <div className="flex flex-col items-end gap-2.5">
            <Image
              src={item.imgURL}
              alt={item.imgURL}
              width={839}
              height={21.33}
              className="rounded-t-[14px]"
            />
            <span className="text-[16px] font-normal text-text-slate">
              გამოქვეყნების თარიღი {item.date}
            </span>
          </div>

          <div className="w-[503px] flex flex-col gap-[24px] pt-[30px] px-5">
            <h3 className="text-[48px] font-bold text-text-black">
              {item.price.toLocaleString().replace(/,/g, ", ")} ₾
            </h3>
            <div className="flex flex-col gap-[16px] font-normal text-text-slate">
              <div className="flex gap-1.5 items-center">
                <div className="w-[22px]">
                  <Image
                    src="/icons/location.png"
                    alt="image"
                    width={22}
                    height={22}
                  />
                </div>
                <span className="text-[24px]">
                  {item.region}, {item.address}
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-[22px]">
                  <Image
                    src="/icons/area.png"
                    alt="image"
                    width={20}
                    height={20}
                  />
                </div>
                <span className="text-[24px]">
                  ფართობი {item.area} მ<sup>2</sup>
                </span>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-[22px]">
                  <Image
                    src="/icons/bed.png"
                    alt="image"
                    width={22}
                    height={22}
                  />
                </div>
                <span className="text-[24px]">საძინებელი {item.bed}</span>
              </div>
              <div className="flex gap-1.5 items-center">
                <div className="w-[22px]">
                  <Image
                    src="/icons/vector.png"
                    alt="image"
                    width={22}
                    height={22}
                  />
                </div>
                <span className="text-[24px]">
                  საფოსტო ინდექსი {item.postIndex}
                </span>
              </div>
            </div>
            <p className="text-[16px] font-normal text-text-slate leading-[26px]">
              {item.description}
            </p>
            <AgentInfo />
            <Button
              type="button"
              title="ლისტინგის წაშლა"
              variant="text-[12px] font-medium leading-[14.4px] text-button-gray border rounded-[8px] p-[10px]"
              action={toggleModal}
            />
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
      <DeleteListing isOpen={isOpen} onClose={toggleModal} />
    </div>
  );
};

export default Listing;
