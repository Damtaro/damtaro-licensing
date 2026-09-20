export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full">

      <svg
        className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.3-4.3m1.3-5.2a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tracks..."
        className="
          h-14
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-950
          pl-14
          pr-5
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-200
          focus:border-orange-500
          focus:ring-2
          focus:ring-orange-500/20
        "
      />

    </div>
  );
}
