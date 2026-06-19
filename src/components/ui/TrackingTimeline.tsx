import { formatDate } from "@/lib/format";

type TrackingEvent = {
  id: string;
  status: string;
  description: string;
  createdAt: Date;
};

export function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <ol className="space-y-4">
      {events.map((ev, i) => {
        const isLast = i === events.length - 1;
        return (
          <li key={ev.id} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div
                className={`h-3 w-3 rounded-full mt-0.5 shrink-0 ${
                  isLast ? "bg-champagne" : "bg-light-gray"
                }`}
              />
              {!isLast && (
                <div className="w-px flex-1 bg-light-gray mt-1 min-h-[24px]" />
              )}
            </div>
            <div className="pb-2">
              <p className="text-sm font-medium text-graphite">{ev.description}</p>
              <p className="text-xs text-text-gray/50">{formatDate(ev.createdAt)}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
