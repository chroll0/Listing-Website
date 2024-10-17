"use client";

import { useState } from "react";
import Button from "./Button";
import { GoChevronDown, GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import AddAgent from "./AddAgent";
import { Region } from "@/types/listing";
import RegionFilter from "./filters/RegionFilter";
import PriceFilter from "./filters/PriceFilter";
import AreaFilter from "./filters/AreaFilter";
import BedroomsFilter from "./filters/BedroomsFilter";
import { SearchProps } from "@/types/filters";

// Reusable Filter Dropdown Component
const FilterDropdown = ({
  label,
  isOpen,
  toggleFilter,
}: {
  label: string;
  isOpen: boolean;
  toggleFilter: () => void;
}) => {
  return (
    <div
      className={`${
        !isOpen ? "bg-transparent" : "bg-[#F3F3F3]"
      } flex justify-center items-center text-text-black font-medium gap-1 cursor-pointer px-4 py-[8.5px] rounded-[6px] transition-all hover:bg-[#F3F3F3]`}
      onClick={toggleFilter}
    >
      <span className="leading-[19px]">{label}</span>
      <GoChevronDown className="font-light mt-1" />
    </div>
  );
};

const Search: React.FC<SearchProps> = ({ filters, setFilters }) => {
  const [regionsData, setRegionsData] = useState<Region[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState({
    region: false,
    price: false,
    area: false,
    bedrooms: false,
  });

  const priceRange = [
    { min: 0, max: 50000 },
    { min: 50000, max: 100000 },
    { min: 100000, max: 150000 },
    { min: 150000, max: 200000 },
    { min: 200000, max: 300000 },
  ];

  const areaRange = [
    { min: 0, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 150 },
    { min: 150, max: 200 },
    { min: 200, max: 300 },
  ];

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const toggleFilter = (filter: keyof typeof isFilterOpen) => {
    setIsFilterOpen((prevState) => ({
      region: false,
      price: false,
      area: false,
      bedrooms: false,
      [filter]: !prevState[filter], // Toggle the clicked filter
    }));
  };
  type FilterType = "region" | "bedrooms" | "all";
  const handleClearFilter = (filter: FilterType) => {
    if (filter === "all") {
      setFilters({
        region: null,
        bedrooms: null,
        price: { min: null, max: null },
        area: { min: null, max: null },
      });
    } else {
      setFilters({
        ...filters,
        [filter]: null,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-5">
      <div className="flex justify-between items-center">
        <div className="relative flex gap-2 border border-[#DBDBDB] rounded-[10px] p-1">
          <FilterDropdown
            label="რეგიონი"
            isOpen={isFilterOpen.region}
            toggleFilter={() => toggleFilter("region")}
          />
          <FilterDropdown
            label="საფასო კატეგორია"
            isOpen={isFilterOpen.price}
            toggleFilter={() => toggleFilter("price")}
          />
          <FilterDropdown
            label="ფართობი"
            isOpen={isFilterOpen.area}
            toggleFilter={() => toggleFilter("area")}
          />
          <FilterDropdown
            label="საძინებლების რაოდენობა"
            isOpen={isFilterOpen.bedrooms}
            toggleFilter={() => toggleFilter("bedrooms")}
          />

          {isFilterOpen.region && (
            <RegionFilter
              regionsData={regionsData}
              setRegionsData={setRegionsData}
              filters={filters}
              setFilters={setFilters}
            />
          )}

          {isFilterOpen.price && <PriceFilter priceRange={priceRange} />}
          {isFilterOpen.area && <AreaFilter areaRange={areaRange} />}
          {isFilterOpen.bedrooms && (
            <BedroomsFilter filters={filters} setFilters={setFilters} />
          )}
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
        {filters.region && (
          <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
            <p>{filters.region}</p>
            <IoMdClose onClick={() => handleClearFilter("region")} />
          </div>
        )}

        {filters.price.min ||
          (filters.price.max && (
            <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
              <p>{filters.price.min} ₾</p>
              <p>-</p>
              <p>{filters.price.max} ₾</p>
              <IoMdClose onClick={() => handleClearFilter("region")} />
            </div>
          ))}

        {filters.area.min ||
          (filters.area.max && (
            <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
              <p>
                {filters.area.min} მ<sup className="text-[9px] pl-[1px]">2</sup>
              </p>
              <p>-</p>
              <p>
                {filters.area.max} მ<sup className="text-[9px] pl-[1px]">2</sup>
              </p>
              <IoMdClose onClick={() => handleClearFilter("region")} />
            </div>
          ))}

        {filters.bedrooms && (
          <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
            <p>{filters.bedrooms}</p>
            <IoMdClose onClick={() => handleClearFilter("bedrooms")} />
          </div>
        )}
        <Button
          type="button"
          title="გასუფთავება"
          variant="text-[14px] font-semibold leading-[16.8px] text-text-darkGray px-[5px] py-[3px]"
          action={() => handleClearFilter("all")}
        />
      </div>

      <AddAgent isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Search;
