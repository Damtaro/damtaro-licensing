export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-orange-500 hover:bg-orange-400 text-white border border-orange-500",

    secondary:
      "bg-transparent hover:bg-white/5 text-white border border-white/15",

    ghost:
      "bg-transparent text-white hover:bg-white/5",

    outline:
      "bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white",
  };

  const sizes = {
    sm: "h-10 px-4 text-sm rounded-xl",
    md: "h-12 px-6 text-base rounded-2xl",
    lg: "h-14 px-8 text-lg rounded-2xl",
  };

  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        font-semibold
        transition-all
        duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
