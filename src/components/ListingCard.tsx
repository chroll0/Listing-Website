import { ListingCardProps } from "@/types/listing";
import Image from "next/image";
import React from "react";

const ListingCard = ({ data }: ListingCardProps) => {
  return (
    <div className="relative rounded-[15px] max-w-[384px] customBorder">
      <Image src={data.imgURL} alt={data.imgURL} width={384} height={307} />
      <div className="flex flex-col px-[22px] py-[25px] gap-[9px]">
        <span className="text-[28px] font-bold text-black leading-[33.6px]">
          {data.price.toLocaleString().replace(/,/g, " ")} ₾
        </span>

        <div className="flex items-center ">
          <Image src="/icons/location.png" alt="image" width={20} height={20} />
          <span className="ml-1 text-[16px] font-normal text-text-gray">
            {data.region} {data.address}
          </span>
        </div>

        <div className="flex h-[24px] items-center gap-8">
          <div className="flex gap-[5px] h-[19px]">
            <Image src="/icons/bed.png" alt="bed" width={18} height={18} />
            <span className="text-[16px] font-normal text-text-gray">
              {data.bed}
            </span>
          </div>
          <div className="flex gap-[5px] h-[19px]">
            <Image src="/icons/area.png" alt="area" width={18} height={18} />
            <span className="text-[16px] font-normal text-text-gray">
              {data.area} მ<sup>2</sup>
            </span>
          </div>
          <div className="flex gap-[5px] h-[19px]">
            <Image
              src="/icons/vector.png"
              alt="vector"
              width={18}
              height={18}
            />
            <span className="text-[16px] font-normal text-text-gray">
              {data.postIndex}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center absolute top-5 left-5 bg-background-darkGray rounded-full w-[90px] h-[26px]">
        <span className="text-[12px] font-medium leading-[4%] text-white">
          {data.type}
        </span>
      </div>
    </div>
  );
};

export default ListingCard;
