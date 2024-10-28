import { PriceFilterProps } from "@/types/filters";
import Button from "../Button";
import { useState } from "react";

const PriceFilter: React.FC<PriceFilterProps> = ({
  filters,
  setFilters,
  toggleFilter,
}) => {
  const priceRange = [
    { min: 0, max: 50000 },
    { min: 50000, max: 100000 },
    { min: 100000, max: 150000 },
    { min: 150000, max: 200000 },
    { min: 200000, max: 300000 },
  ];

  const [selectedPrice, setSelectedPrice] = useState<{
    min: number | null;
    max: number | null;
  } | null>(filters.price || null);

  const [minPrice, setMinPrice] = useState<number | "">(
    selectedPrice?.min || ""
  );
  const [maxPrice, setMaxPrice] = useState<number | "">(
    selectedPrice?.max || ""
  );

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? "" : Number(event.target.value);
    setMinPrice(value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? "" : Number(event.target.value);
    setMaxPrice(value);
  };

  const handlePriceRangeClick = (min: number | null, max: number | null) => {
    if (min !== null && max === null) {
      if (maxPrice !== "" && min >= maxPrice) {
        return;
      }
      setMinPrice(min);
    }
    if (max !== null && min === 0) {
      if (minPrice !== "" && max <= minPrice) {
        return;
      }
      setMaxPrice(max);
    }
  };

  const handleButtonClick = () => {
    setFilters({
      ...filters,
      price: {
        min: minPrice !== "" ? minPrice : null,
        max: maxPrice !== "" ? maxPrice : null,
      },
    });
    toggleFilter("price"), console.log(filters);
  };

  return (
    <div className="absolute top-20 left-[138px] border border-[#DBDBDB] rounded-[10px] p-[24px] bg-white flex flex-col gap-5 z-10 w-1/2">
      <p className="text-[16px] font-semibold">ფასის მიხედვით</p>

      <div className="flex gap-6">
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="დან"
            value={minPrice !== null ? minPrice : ""}
            onChange={handleMinPriceChange}
            className="w-full border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-0 right-2 h-full flex items-center text-[12px] text-gray-400">
            ₾
          </span>
        </div>
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="მდე"
            value={maxPrice !== null ? maxPrice : ""}
            onChange={handleMaxPriceChange}
            className="w-full border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-0 right-2 h-full flex items-center text-[12px] text-gray-400">
            ₾
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-4 pb-4">
          <p className="flex-1 text-[14px] font-medium text-text-black">
            მინ. ფასი
          </p>
          <p className="flex-1 text-[14px] font-medium text-text-black">
            მაქს. ფასი
          </p>
        </div>
        <div>
          {priceRange.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 text-[14px] transition-all cursor-pointer"
            >
              <p
                className="flex-1 hover:bg-[#F3F3F3] p-1 rounded-[3px]"
                onClick={() => handlePriceRangeClick(item.min, null)}
              >
                {item.min.toLocaleString()} ₾
              </p>
              <p
                className="flex-1 hover:bg-[#F3F3F3] p-1 rounded-[3px]"
                onClick={() => handlePriceRangeClick(0, item.max)}
              >
                {item.max.toLocaleString()} ₾
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          title="არჩევა"
          variant="text-[14px] font-medium leading-[16.8px] rounded-[10px] py-[12.5px] px-[24.5px] bg-button-tomato text-white"
          action={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
