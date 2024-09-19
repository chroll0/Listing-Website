import { ButtonProps } from "@/types/button";
import Link from "next/link";

const Button = ({ type, title, icon, variant, link, action }: ButtonProps) => {
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
