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
import { IsFilterOpen, SearchProps } from "@/types/filters";

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
  const [isFilterOpen, setIsFilterOpen] = useState<IsFilterOpen>({
    region: false,
    price: false,
    area: false,
    bedrooms: false,
  });

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
  type FilterType = "region" | "bedrooms" | "price" | "area" | "all";
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
              toggleFilter={toggleFilter}
            />
          )}

          {isFilterOpen.price && (
            <PriceFilter
              filters={filters}
              setFilters={setFilters}
              toggleFilter={toggleFilter}
            />
          )}

          {isFilterOpen.area && (
            <AreaFilter
              filters={filters}
              setFilters={setFilters}
              toggleFilter={toggleFilter}
            />
          )}

          {isFilterOpen.bedrooms && (
            <BedroomsFilter
              filters={filters}
              setFilters={setFilters}
              toggleFilter={toggleFilter}
            />
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
            <IoMdClose
              onClick={() => handleClearFilter("region")}
              className="transition-all hover:rotate-90"
            />
          </div>
        )}

        {!(filters.price.min === null && filters.price.max === null) && (
          <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
            <p>
              {filters.price.min !== null
                ? `${filters.price.min.toLocaleString()} ₾`
                : "0 ₾"}
            </p>
            <p>-</p>
            <p>
              {filters.price.max !== null
                ? `${filters.price.max.toLocaleString()} ₾`
                : "∞"}
            </p>
            <IoMdClose
              onClick={() => handleClearFilter("price")}
              className="transition-all hover:rotate-90"
            />
          </div>
        )}

        {!(filters.area.min === null && filters.area.max === null) && (
          <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
            <p>
              {filters.area.min !== null
                ? `${filters.area.min.toLocaleString()}`
                : "0"}{" "}
              მ<sup className="text-[9px] pl-[1px]">2</sup>
            </p>
            <p>-</p>
            <p>
              {filters.area.max !== null
                ? `${filters.area.max.toLocaleString()}`
                : "∞"}{" "}
              მ<sup className="text-[9px] pl-[1px]">2</sup>
            </p>
            <IoMdClose
              onClick={() => handleClearFilter("area")}
              className="transition-all hover:rotate-90"
            />
          </div>
        )}

        {filters.bedrooms && (
          <div className="flex gap-1 items-center border px-[11px] py-[3px] rounded-full font-normal cursor-pointer text-[14px] text-text-darkGray">
            <p>{filters.bedrooms}</p>
            <IoMdClose
              onClick={() => handleClearFilter("bedrooms")}
              className="transition-all hover:rotate-90"
            />
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
