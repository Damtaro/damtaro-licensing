import { useId } from "react";

export default function LegalAcceptance({ checked, onChange, onReadLegal, confirmInformation = false }) {
  const id = useId();
  const labelId = `${id}-label`;
  const linkStyle = "min-h-11 rounded px-1 text-orange-400 underline underline-offset-4 hover:text-orange-300";

  return (
    <div className="flex items-start gap-3 text-sm leading-7 text-zinc-300">
      <input id={id} type="checkbox" required checked={checked} onChange={(event) => onChange(event.target.checked)} aria-labelledby={labelId} className="mt-3 h-5 w-5 shrink-0 accent-orange-500" />
      <div id={labelId}>
        <label htmlFor={id} className="cursor-pointer">
          {confirmInformation ? "I confirm that the information provided is accurate and I agree to the " : "I agree to the "}
        </label>
        <button type="button" className={linkStyle} onClick={() => onReadLegal("license-terms")}>License Terms</button>
        {" and "}
        <button type="button" className={linkStyle} onClick={() => onReadLegal("terms-of-service")}>Terms of Service</button>.
      </div>
    </div>
  );
}
