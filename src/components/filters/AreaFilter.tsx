import { AreaFilterProps } from "@/types/filters";
import Button from "../Button";
import { useState } from "react";

const AreaFilter: React.FC<AreaFilterProps> = ({
  filters,
  setFilters,
  toggleFilter,
}) => {
  const areaRange = [
    { min: 0, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 150 },
    { min: 150, max: 200 },
    { min: 200, max: 300 },
  ];
  const [selectedArea, setSelectedArea] = useState<{
    min: number | null;
    max: number | null;
  } | null>(filters.area || null);

  const [minArea, setMinArea] = useState<number | "">(selectedArea?.min || "");
  const [maxArea, setMaxArea] = useState<number | "">(selectedArea?.max || "");

  const handleMinAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? "" : Number(event.target.value);
    setMinArea(value);
  };

  const handleMaxAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value === "" ? "" : Number(event.target.value);
    setMaxArea(value);
  };

  const handleAreaRangeClick = (min: number | null, max: number | null) => {
    if (min !== null && max === null) {
      if (maxArea !== "" && min >= maxArea) {
        return;
      }
      setMinArea(min);
    }
    if (max !== null && min === 0) {
      if (minArea !== "" && max <= minArea) {
        return;
      }
      setMaxArea(max);
    }
  };

  const handleButtonClick = () => {
    setFilters({
      ...filters,
      area: {
        min: minArea !== "" ? minArea : null,
        max: maxArea !== "" ? maxArea : null,
      },
    });
    toggleFilter("area"), console.log(filters);
  };
  return (
    <div className="absolute top-20 right-[35px] border border-[#DBDBDB] rounded-[10px] p-[24px] bg-white flex flex-col gap-5 z-10 w-1/2">
      <p className="text-[16px] font-semibold">ფართობის მიხედვით</p>

      <div className="flex gap-6">
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="დან"
            value={minArea !== null ? minArea : ""}
            onChange={handleMinAreaChange}
            className="w-full border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-0 right-2 h-full flex items-center text-[12px] text-gray-400">
            მ<sup className="text-[9px] pl-[1px]">2</sup>
          </span>
        </div>
        <div className="relative flex-1">
          <input
            type="number"
            placeholder="მდე"
            value={maxArea !== null ? maxArea : ""}
            onChange={handleMaxAreaChange}
            className="w-full border border-[#DBDBDB] rounded-[6px] py-[10px] px-[20px] text-start text-[14px] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute top-0 right-2 h-full flex items-center text-[12px] text-gray-400">
            მ<sup className="text-[9px] pl-[1px]">2</sup>
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex gap-4 pb-4">
          <p className="flex-1 text-[14px] font-medium text-text-black">
            მინ. მ<sup className="text-[9px] pl-[1px]">2</sup>
          </p>
          <p className="flex-1 text-[14px] font-medium text-text-black">
            მაქს. მ<sup className="text-[9px] pl-[1px]">2</sup>
          </p>
        </div>
        <div>
          {areaRange.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 text-[14px] transition-all cursor-pointer"
            >
              <p
                className="flex-1 hover:bg-[#F3F3F3] p-1 rounded-[3px]"
                onClick={() => handleAreaRangeClick(item.min, null)}
              >
                {item.min.toLocaleString()} მ
                <sup className="text-[9px] pl-[1px]">2</sup>
              </p>
              <p
                className="flex-1 hover:bg-[#F3F3F3] p-1 rounded-[3px]"
                onClick={() => handleAreaRangeClick(0, item.max)}
              >
                {item.max.toLocaleString()} მ
                <sup className="text-[9px] pl-[1px]">2</sup>
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

export default AreaFilter;
