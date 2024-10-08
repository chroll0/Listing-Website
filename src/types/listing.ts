import { listingSchema } from "@/components/validations";
import * as yup from "yup";

export type Agent = {
  firstName: string;
  lastName: string;
  imgURL: string;
  mail: string;
  number: number;
};

export type Listing = {
  id: number;
  image: string;
  price: number;
  city: {
    id: number;
    name: string;
    region_id: number;
    region: {
      id: number;
      name: string;
    };
  };
  address: string;
  bedrooms: number;
  area: number;
  zip_code: string;
  is_rental: number;
  description: string;
  date: string;
  agent: {
    name: string;
    surname: string;
    avatar: string;
    email: string;
    phone: string;
  };
};
export interface ListingCardProps {
  data: Listing;
}
export type listingProps = (
  field:
    | "listingType"
    | "address"
    | "postIndex"
    | "region"
    | "city"
    | "price"
    | "area"
    | "bed"
    | "description"
    | "image"
    | "agent",
  value: string
) => void;

export type ListingInfo = yup.InferType<typeof listingSchema>;

export interface City {
  id: number;
  name: string;
  region_id: number;
}
export interface Region {
  id: number;
  name: string;
}
