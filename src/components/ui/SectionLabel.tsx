interface SectionLabelProps {
  text: string;
  className?: string;
  centered?: boolean;
}

export function SectionLabel({ text, className = '', centered = false }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''} ${className}`}>
      <div className="h-px w-8 bg-espresso/20" />
      <span className="text-sm font-medium tracking-warm text-driftwood">
        {text}
      </span>
      {centered && <div className="h-px w-8 bg-espresso/20" />}
    </div>
  );
}
