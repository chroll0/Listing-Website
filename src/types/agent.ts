export type handleChangeProps = (
  field: "number" | "firstName" | "lastName" | "email" | "image",
  value: string
) => void;

export interface AddAgentProps {
  isOpen: boolean;
  onClose: () => void;
}
