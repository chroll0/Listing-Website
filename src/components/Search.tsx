"use client";

import { useState } from "react";
import Button from "./Button";
import { GoChevronDown, GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import AddAgent from "./AddAgent";

const Search = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className="flex flex-col gap-6 py-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 border border-[#DBDBDB] rounded-[10px]">
          <div className="flex justify-center items-center text-text-black font-medium gap-1 cursor-pointer p-[13px] ">
            <span className="leading-[19px]">რეგიონი</span>
            <GoChevronDown className="font-light mt-1" />
          </div>
          <div className="flex justify-center items-center text-text-black font-medium gap-1 cursor-pointer p-[13px] ">
            <span className="leading-[19px]">საფასო კატეგორია</span>
            <GoChevronDown className="font-light mt-1" />
          </div>
          <div className="flex justify-center items-center text-text-black font-medium gap-1 cursor-pointer p-[13px] ">
            <span className="leading-[19px]">ფართობი</span>
            <GoChevronDown className="font-light mt-1" />
          </div>
          <div className="flex justify-center items-center text-text-black font-medium gap-1 cursor-pointer p-[13px] ">
            <span className="leading-[19px]">საძინებლების რაოდენობა</span>
            <GoChevronDown className="font-light mt-1" />
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            type="button"
            title="ლისტინგის დამატება"
            icon={<GoPlus />}
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[12.5px] px-[24.5px] bg-button-tomato text-white"
            link="/pages/add_listing/"
          />
          <Button
            type="button"
            title="აგენტის დამატება"
            icon={<GoPlus />}
            variant="text-[16px] font-medium leading-[19.2px] rounded-[10px] py-[11.5px] px-[24.5px] text-button-tomato bg-text-white border border-button-tomato"
            action={toggleModal}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center border px-[11px] py-[3px] rounded-full font-normal">
          <span className="mr-1 text-[14px] text-text-darkGray">თბილისი</span>
          <IoMdClose className="text-[14px]" />
        </div>
        <div className="flex items-center border px-[11px] py-[3px] rounded-full font-normal">
          <span className="mr-1 text-[14px] text-text-darkGray">
            20 000₾ - 100 000₾
          </span>
          <IoMdClose className="text-[14px]" />
        </div>
        <button
          type="button"
          className="text-[14px] font-semibold leading-[16.8px] text-text-darkGray px-[5px] py-[3px]"
        >
          გასუფთავება
        </button>
      </div>
      {/* Agent modal */}
      <AddAgent isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Search;
