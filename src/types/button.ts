import { ReactNode } from "react";

export type ButtonProps = {
  type: "button" | "submit";
  title: string | ReactNode;
  icon?: ReactNode;
  variant: string;
  link?: string;
  action?: VoidFunction;
};
