import { AlertTriangle, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

const severityConfig = {
  critical: {
    bg:    'bg-red-500/5 border-red-500/20',
    icon:  <AlertTriangle className="text-red-400 shrink-0" size={16} />,
    badge: 'bg-red-500/10 text-red-400',
  },
  high: {
    bg:    'bg-orange-500/5 border-orange-500/20',
    icon:  <AlertTriangle className="text-orange-400 shrink-0" size={16} />,
    badge: 'bg-orange-500/10 text-orange-400',
  },
  medium: {
    bg:    'bg-yellow-500/5 border-yellow-500/20',
    icon:  <AlertCircle className="text-yellow-400 shrink-0" size={16} />,
    badge: 'bg-yellow-500/10 text-yellow-400',
  },
  low: {
    bg:    'bg-blue-500/5 border-blue-500/20',
    icon:  <CheckCircle className="text-blue-400 shrink-0" size={16} />,
    badge: 'bg-blue-500/10 text-blue-400',
  },
};

export default function NewsCard({ event }) {
  const cfg = severityConfig[event.severity] || severityConfig.low;

  return (
    <div className={`rounded-xl border p-4 ${cfg.bg}`}>
      <div className="flex items-start gap-3">
        {cfg.icon}
        <div className="flex-1 min-w-0">

          {/* Title + Badge */}
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <p className="font-medium text-white text-sm leading-snug">
              {event.title}
            </p>
            <span className={`text-xs px-2 py-0.5 rounded-full
                              font-semibold shrink-0 ${cfg.badge}`}>
              {event.severity.toUpperCase()}
            </span>
          </div>

          {/* Description */}
          {event.description && (
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              {event.description.slice(0, 120)}
              {event.description.length > 120 ? '...' : ''}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-gray-500">{event.source}</span>
            {event.url && (
            
            <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs
                           text-emerald-400 hover:underline"
                onClick={e => e.stopPropagation()}
              >
                Read more <ExternalLink size={10} />
              </a>
            )}
            <span className="text-xs text-gray-500 ml-auto">
              {new Date(event.createdAt).toLocaleDateString()}
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}