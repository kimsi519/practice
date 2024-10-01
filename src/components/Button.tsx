import React from "react";

type ButtonProps = {
  variant: "primary" | "secondary" | "danger";
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const Button: React.FC<ButtonProps> = ({
  variant,
  children,
  className,
  style,
}) => {
  return (
    <button className={`${className} ${variant}`} style={style}>
      {children}
    </button>
  );
};

export default Button;
