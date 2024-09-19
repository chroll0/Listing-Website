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
export interface AddAgentProps {
  isOpen: boolean;
  onClose: () => void;
}
