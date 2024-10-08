import { agentSchema } from "@/components/validations";
import * as yup from "yup";

export type handleChangeProps = (
  field: "number" | "firstName" | "lastName" | "email" | "image",
  value: string
) => void;

export interface AddAgentProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DeleteListingProps {
  isOpen: boolean;
  onClose: () => void;
  id: string | number;
}

export type AgentInfo = yup.InferType<typeof agentSchema>;
