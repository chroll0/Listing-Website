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

export type AgentInfo = yup.InferType<typeof agentSchema>;
