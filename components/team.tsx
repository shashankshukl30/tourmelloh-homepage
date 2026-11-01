import Image from "next/image";
import { team } from "@/lib/brand";

/** The people behind Tourmelloh. Initials until real portraits are supplied; never AI likenesses. */
export function Team() {
  return (
    <ul className="team">
      {team.map((m) => (
        <li key={m.name} className="team-card">
          <span className="team-photo" aria-hidden={!m.photo}>
            {m.photo ? <Image src={m.photo} alt={m.name} fill sizes="160px" /> : m.name.slice(0, 1)}
          </span>
          <strong>{m.name}</strong>
          <span className="team-role">{m.role}</span>
        </li>
      ))}
    </ul>
  );
}
