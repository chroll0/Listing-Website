import { ReactNode } from "react";

export type ButtonProps = {
  type: "button" | "submit";
  title: string | ReactNode;
  icon?: string;
  variant: string;
  link?: string;
  action?: VoidFunction;
};
