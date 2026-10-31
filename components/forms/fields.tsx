"use client";

import { ChevronDown } from "lucide-react";

/** Small, labelled form controls shared by every enquiry form. */
export function Field({ label, hint, children, full }: { label: string; hint?: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`enquiry-field ${full ? "is-full" : ""}`}>
      <span>{label}{hint && <small>{hint}</small>}</span>
      {children}
    </label>
  );
}

export function Text({ name, value, onChange, type = "text", required, placeholder, autoComplete }: {
  name: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; placeholder?: string; autoComplete?: string;
}) {
  return <input name={name} type={type} value={value} required={required} placeholder={placeholder} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} />;
}

export function Area({ name, value, onChange, placeholder, rows = 4 }: { name: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  return <textarea name={name} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

export function Choice({ name, value, onChange, options }: { name: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <span className="select-wrap">
      <select name={name} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={17} aria-hidden="true" />
    </span>
  );
}

export function Pills({ legend, options, value, onChange, multiple }: { legend: string; options: string[]; value: string; onChange: (v: string) => void; multiple?: boolean }) {
  const chosen = value ? value.split(", ") : [];
  return (
    <fieldset className="enquiry-pills">
      <legend>{legend}</legend>
      <div>
        {options.map((o) => {
          const on = chosen.includes(o);
          return (
            <button key={o} type="button" aria-pressed={on} onClick={() => {
              if (!multiple) return onChange(on ? "" : o);
              onChange((on ? chosen.filter((c) => c !== o) : [...chosen, o]).join(", "));
            }}>{o}</button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function months(from = new Date()) {
  const list: string[] = [];
  for (let i = 0; i < 15; i++) list.push(new Date(from.getFullYear(), from.getMonth() + i, 1).toLocaleString("en-GB", { month: "long", year: "numeric" }));
  return list;
}
