export type handleChangeProps = (
  field: "number" | "firstName" | "lastName" | "email" | "image",
  value: string
) => void;

export interface AddAgentProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface AgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  image?: FileList;
}
