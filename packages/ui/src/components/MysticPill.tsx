import React from "react";

type MysticPillProps = {
  text: string;
};

export function MysticPill({ text }: MysticPillProps) {
  return (
    <div className="rounded-full border border-brand-secondary px-4 py-2">
      <span className="text-brand-secondary">{text}</span>
    </div>
  );
}
