export interface IntelligenceFeedItemProps {
  category: string;
  categoryColorClass?: string;
  date: string;
  title: string;
  summary?: string;
}

export default function IntelligenceFeedItem({
  category,
  categoryColorClass = "text-primary",
  date,
  title,
  summary,
}: IntelligenceFeedItemProps) {
  return (
    <div className="p-3.5 rounded-2xl bg-surface-container-low/80 hover:bg-surface-container transition-all flex flex-col gap-1.5 cursor-pointer">
      <div className="flex items-center justify-between text-on-surface-variant">
        <span className={`font-label-caps text-[10px] ${categoryColorClass} uppercase font-bold`}>
          {category}
        </span>
        <span className="font-label-caps text-[10px]">
          {date}
        </span>
      </div>
      <h4 className="font-body-md text-body-md font-medium text-on-surface hover:text-primary transition-colors">
        {title}
      </h4>
      {summary && (
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          {summary}
        </p>
      )}
    </div>
  );
}
