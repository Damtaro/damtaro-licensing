import { useMemo, useState } from "react";
import tracks from "../../data/tracks";
import Container from "../ui/Container";
import SearchBar from "./SearchBar";
import FilterChip from "./FilterChip";

const availableFilters = ["genre", "mood", "bpm", "duration"];
const unavailableFilters = ["Energy", "Vocals"];

export default function SearchSection({ query, onQueryChange, filters, onFiltersChange }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const options = useMemo(() => Object.fromEntries(availableFilters.map((key) => [key, [...new Set(tracks.map((track) => String(track[key])))]])), []);

  function selectOption(key, value) {
    onFiltersChange((current) => {
      if (current[key] === value) {
        const nextFilters = { ...current };
        delete nextFilters[key];
        return nextFilters;
      }

      return { ...current, [key]: value };
    });
  }

  function clearFilter(key) {
    onFiltersChange((current) => {
      const nextFilters = { ...current };
      delete nextFilters[key];
      return nextFilters;
    });
  }

  return <section className="py-24"><Container><div className="mx-auto max-w-4xl text-center">
    <h2 className="text-4xl font-bold text-white">Find Your Sound</h2>
    <p className="mt-4 text-lg text-zinc-400">Search by title, genre, mood, BPM or duration.</p>
    <div className="mt-10"><SearchBar value={query} onChange={onQueryChange} /></div>
    <div className="mt-8 flex flex-wrap justify-center gap-3">
      {availableFilters.map((key) => <FilterChip key={key} active={Boolean(filters[key]) || activeFilter === key} onClick={() => setActiveFilter((current) => current === key ? null : key)}>{key === "bpm" ? "BPM" : `${key[0].toUpperCase()}${key.slice(1)}`}</FilterChip>)}
      {unavailableFilters.map((label) => <FilterChip key={label} disabled title={`${label} metadata is not available yet`}>{label}</FilterChip>)}
    </div>
    {activeFilter && <div className="mt-5 flex flex-wrap justify-center gap-3"><FilterChip active={!filters[activeFilter]} onClick={() => clearFilter(activeFilter)}>All</FilterChip>{options[activeFilter].map((value) => <FilterChip key={value} active={filters[activeFilter] === value} onClick={() => selectOption(activeFilter, value)}>{activeFilter === "bpm" ? `${value} BPM` : value}</FilterChip>)}</div>}
  </div></Container></section>;
}
