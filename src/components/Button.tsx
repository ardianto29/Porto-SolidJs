import { JSX } from "solid-js";

interface ButtonProps {
  children: JSX.Element | string;
  type?: "submit" | "button" | "reset";
  variant?: "default" | "submit";
  onClick?: () => void;
}

export function Button({
  children,
  type = "button",
  variant = "default",
  onClick,
}: ButtonProps): JSX.Element {
  const baseClasses =
    "px-4 py-3 bg-white border-[1.5px] border-current cursor-pointer transition ease-in-out duration-200 hover:shadow-sm";
  const submitClasses =
    "w-full px-4 py-3 bg-iconColors-primary text-white rounded-md cursor-pointer transition ease-in-out duration-200 hover:bg-iconColors-hover";

  const buttonClass = variant === "submit" ? submitClasses : baseClasses;

  return (
    <button type={type} class={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
}
