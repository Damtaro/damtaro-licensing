export default function FilterChip({
  children,
  active = false,
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        h-11
        rounded-full
        border
        px-5
        text-sm
        font-medium
        transition-all
        duration-200
        ${
          active
            ? "border-orange-500 bg-orange-500 text-white"
            : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800"
        }
        ${disabled ? "cursor-not-allowed opacity-50 hover:border-zinc-700 hover:bg-zinc-900" : ""}
      `}
    >
      {children}
    </button>
  );
}
