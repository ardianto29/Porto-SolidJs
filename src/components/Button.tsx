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
    "group w-full px-6 py-4 bg-gradient-to-r from-iconColors-primary to-iconColors-hover text-white rounded-2xl cursor-pointer transition-all ease-in-out duration-300 hover:shadow-xl hover:shadow-iconColors-primary/25 hover:-translate-y-1 transform relative overflow-hidden";

  const buttonClass = variant === "submit" ? submitClasses : baseClasses;

  return (
    <button type={type} class={buttonClass} onClick={onClick}>
      {variant === "submit" && (
        <div class="absolute inset-0 bg-gradient-to-r from-iconColors-hover to-iconColors-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      <div class="relative z-10 font-semibold text-lg">
        {children}
      </div>
    </button>
  );
}
