export interface MediaCitationCardProps {
  category: string;
  date: string;
  title: string;
  summary: string;
  citationSource: string;
  iconName: string;
}

export default function MediaCitationCard({
  category,
  date,
  title,
  summary,
  citationSource,
  iconName
}: MediaCitationCardProps) {
  return (
    <div className="rounded-3xl bg-surface-container-lowest p-7 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
      <div className="space-y-3">
        <div className="flex items-center justify-between text-on-surface-variant">
          <span className="font-label-caps text-label-caps uppercase text-primary font-semibold">{category}</span>
          <span className="font-label-caps text-label-caps">{date}</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">
          {title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {summary}
        </p>
      </div>
      <div className="pt-6 flex items-center justify-between text-on-surface-variant font-label-caps text-label-caps">
        <span className="uppercase">{citationSource}</span>
        <span className="material-symbols-outlined text-[18px]">{iconName}</span>
      </div>
    </div>
  );
}
