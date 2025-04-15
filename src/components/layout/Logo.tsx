
import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

const Logo = ({ size = "md", withText = true }: LogoProps) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`bg-resto-orange rounded-md ${sizes[size]} flex items-center justify-center`}>
        <span className="text-white font-bold text-xl">R</span>
      </div>
      {withText && (
        <span className="font-heading font-bold text-xl">RestoTouch</span>
      )}
    </div>
  );
};

export default Logo;
