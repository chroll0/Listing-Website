import { ButtonProps } from "@/types/button";
import Link from "next/link";
import { ReactNode } from "react";

const Button = ({ type, title, icon, variant, link, action }: ButtonProps) => {
  const renderTitle = (title: string | ReactNode) => {
    if (typeof title === "string") {
      return title;
    }
    return null;
  };

  return (
    <Link href={link || "#"} prefetch={false}>
      <button
        className={`transition-all flex justify-center items-center ${variant}`}
        type={type}
        onClick={action}
      >
        {icon && <div className="mr-2 text-[22px]">{icon}</div>}
        {title}
      </button>
    </Link>
  );
};

export default Button;
