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

export interface SearchProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

export interface RegionsOptionProps {
  regionsData: Region[];
  setRegionsData: (data: Region[]) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}
