import { Region } from "./listing";

export interface Filters {
  region: string | null;
  price: {
    min: number | null;
    max: number | null;
  };
  area: {
    min: number | null;
    max: number | null;
  };
  bedrooms: number | null;
}
export type IsFilterOpen = {
  region: boolean;
  price: boolean;
  area: boolean;
  bedrooms: boolean;
};

export interface SearchProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface BedroomsProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleFilter: (filter: keyof IsFilterOpen) => void;
}

export interface RegionsOptionProps {
  regionsData: Region[];
  setRegionsData: (data: Region[]) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleFilter: (filter: keyof IsFilterOpen) => void;
}

export interface PriceFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleFilter: (filter: keyof IsFilterOpen) => void;
}

export interface AreaFilterProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  toggleFilter: (filter: keyof IsFilterOpen) => void;
}
