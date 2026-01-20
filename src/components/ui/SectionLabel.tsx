interface SectionLabelProps {
  text: string;
  className?: string;
}

export function SectionLabel({ text, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="h-px w-8 md:w-12 bg-luxury-fg" />
      <span className="text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
        {text}
      </span>
    </div>
  );
}
