interface SectionLabelProps {
  number: string;
  text: string;
  className?: string;
}

export function SectionLabel({ number, text, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-swiss-accent font-bold text-xs tracking-widest">
        {number}.
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">
        {text}
      </span>
    </div>
  );
}
