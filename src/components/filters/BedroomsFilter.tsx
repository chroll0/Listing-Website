import React, { useState } from "react";
import Button from "../Button";
import { BedroomsProps } from "@/types/filters";

const BedroomsFilter = ({
  filters,
  setFilters,
  toggleFilter,
}: BedroomsProps) => {
  const [value, setValue] = useState(filters.bedrooms || 0);
  // Handle input change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);

    // Only update if the value is valid
    if (newValue > 0 && newValue <= 99) {
      setValue(newValue);
    }
  };

  const handleButtonClick = () => {
    setFilters({ ...filters, bedrooms: value });
    toggleFilter("bedrooms");
  };

  return (
    <div className="absolute top-20 right-0 border border-[#DBDBDB] rounded-[10px] p-[24px] bg-white flex flex-col gap-5 z-10 w-[37%]">
      <p className="text-[16px] font-semibold">საძინებლების რაოდენობა</p>

      <div className="flex-1">
        <input
          type="number"
          value={value}
          placeholder="0"
          onChange={handleChange}
          className="w-[35%] border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="w-full flex justify-end">
        <Button
          type="button"
          title="არჩევა"
          action={handleButtonClick}
          variant="text-[14px] font-medium leading-[16.8px] rounded-[10px] py-[12.5px] px-[24.5px] bg-button-tomato text-white"
        />
      </div>
    </div>
  );
};

export default BedroomsFilter;
