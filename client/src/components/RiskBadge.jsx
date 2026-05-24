const riskBg = {
  secure:   'bg-green-500/10 text-green-400 border-green-500/20',
  low:      'bg-blue-500/10 text-blue-400 border-blue-500/20',
  medium:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function RiskBadge({ score, riskLevel }) {
  if (score === null || score === undefined) return null;

  return (
    <span className={`text-xs font-bold px-2.5 py-1 rounded-full
                      border capitalize ${riskBg[riskLevel] || riskBg.medium}`}>
      {score}/100 · {riskLevel}
    </span>
  );
}