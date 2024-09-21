export type Agent = {
  firstName: string;
  lastName: string;
  imgURL: string;
  mail: string;
  number: number;
};

export type Listing = {
  id: string;
  imgURL: string;
  price: number;
  region: string;
  address: string;
  area: number;
  bed: number;
  type: string;
  postIndex: number;
  description: string;
  date: string;
  agent: Agent;
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

export interface ListingInfo {
  listingType?: string;
  address?: string;
  postIndex?: string;
  region?: string;
  city?: string;
  price?: string;
  area?: string;
  description?: string;
  image?: string;
  agent?: string;
}
