import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Globe, ArrowLeft, AlertTriangle,
  AlertCircle, CheckCircle, Calendar,
  MapPin, Tag, RefreshCw
} from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const riskBg = {
  secure:   'bg-green-500/10 text-green-400 border-green-500/20',
  low:      'bg-blue-500/10 text-blue-400 border-blue-500/20',
  medium:   'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  high:     'bg-orange-500/10 text-orange-400 border-orange-500/20',
  critical: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const severityConfig = {
  critical: {
    bg:   'bg-red-500/5 border-red-500/20',
    icon: <AlertTriangle className="text-red-400 shrink-0" size={16} />,
    badge:'bg-red-500/10 text-red-400',
  },
  high: {
    bg:   'bg-orange-500/5 border-orange-500/20',
    icon: <AlertTriangle className="text-orange-400 shrink-0" size={16} />,
    badge:'bg-orange-500/10 text-orange-400',
  },
  medium: {
    bg:   'bg-yellow-500/5 border-yellow-500/20',
    icon: <AlertCircle className="text-yellow-400 shrink-0" size={16} />,
    badge:'bg-yellow-500/10 text-yellow-400',
  },
  low: {
    bg:   'bg-blue-500/5 border-blue-500/20',
    icon: <CheckCircle className="text-blue-400 shrink-0" size={16} />,
    badge:'bg-blue-500/10 text-blue-400',
  },
};

export default function Supplier() {
  usePageTitle('Supplier Detail');
  const { id }                    = useParams();
  const [supplier, setSupplier]   = useState(null);
  const [events, setEvents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate                  = useNavigate();

  useEffect(() => { fetchSupplier(); }, [id]);

  const fetchSupplier = async () => {
    try {
      const { data } = await api.get(`/suppliers/${id}`);
      setSupplier(data.data);
      setEvents(data.data.events || []);
    } catch {
      toast.error('Failed to load supplier');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await api.post('/suppliers/refresh');
      toast.success('Refreshing risk score...');
      setTimeout(fetchSupplier, 5000);
    } catch {
      toast.error('Failed to refresh');
    } finally {
      setTimeout(() => setRefreshing(false), 5000);
    }
  };

  // Mock chart data using current score
  const chartData = supplier ? [
    { time: '6h ago', score: Math.min(100, supplier.riskScore + 15) },
    { time: '5h ago', score: Math.min(100, supplier.riskScore + 10) },
    { time: '4h ago', score: Math.min(100, supplier.riskScore + 8)  },
    { time: '3h ago', score: Math.min(100, supplier.riskScore + 5)  },
    { time: '2h ago', score: Math.min(100, supplier.riskScore + 3)  },
    { time: '1h ago', score: Math.min(100, supplier.riskScore + 1)  },
    { time: 'Now',    score: supplier.riskScore },
  ] : [];

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-emerald-500
                      border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!supplier) return null;

  const scoreColor =
    supplier.riskScore >= 80 ? 'text-green-400'  :
    supplier.riskScore >= 60 ? 'text-blue-400'   :
    supplier.riskScore >= 40 ? 'text-yellow-400' :
    supplier.riskScore >= 20 ? 'text-orange-400' :
    'text-red-400';

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Navbar ── */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="text-emerald-400" size={22} />
            <span className="text-xl font-bold">SupplyPulse</span>
          </div>
          <Link to="/dashboard"
            className="flex items-center gap-2 text-sm text-gray-400
                       hover:text-white transition">
            <ArrowLeft size={16} /> Dashboard
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {supplier.name}
            </h1>
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <MapPin size={14} />
                {supplier.city
                  ? `${supplier.city}, `
                  : ''}{supplier.country}
              </span>
              {supplier.category && (
                <span className="flex items-center gap-1
                                 text-gray-400 text-sm">
                  <Tag size={14} /> {supplier.category}
                </span>
              )}
              <span className="flex items-center gap-1
                               text-gray-400 text-sm">
                <Calendar size={14} />
                Updated {new Date(supplier.lastUpdated)
                  .toLocaleDateString()}
              </span>
            </div>
          </div>

          <button onClick={handleRefresh} disabled={refreshing}
            className="flex items-center gap-2 bg-emerald-600 text-white
                       px-4 py-2.5 rounded-xl hover:bg-emerald-700
                       disabled:opacity-50 transition text-sm font-medium">
            <RefreshCw size={16}
              className={refreshing ? 'animate-spin' : ''} />
            Refresh Score
          </button>
        </div>

        {/* ── Score Card ── */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800
                        p-6 mb-6">
          <div className="flex items-center gap-6 flex-wrap">

            {/* Score Ring */}
            <div className="relative flex items-center
                            justify-center shrink-0">
              <svg width="100" height="100" className="-rotate-90">
                <circle cx="50" cy="50" r="40"
                  fill="none" stroke="#1f2937" strokeWidth="8" />
                <circle cx="50" cy="50" r="40"
                  fill="none"
                  stroke={
                    supplier.riskScore >= 80 ? '#22c55e' :
                    supplier.riskScore >= 60 ? '#3b82f6' :
                    supplier.riskScore >= 40 ? '#eab308' :
                    supplier.riskScore >= 20 ? '#f97316' :
                    '#ef4444'
                  }
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 *
                    (1 - supplier.riskScore / 100)}`}
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className={`text-2xl font-black ${scoreColor}`}>
                  {supplier.riskScore}
                </span>
                <span className="text-xs text-gray-500">/ 100</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <span className={`inline-block text-sm font-bold px-3 py-1
                               rounded-full border capitalize mb-2
                               ${riskBg[supplier.riskLevel] || riskBg.medium}`}>
                {supplier.riskLevel} Risk
              </span>
              <p className="text-gray-400 text-sm">
                Status:{' '}
                <span className="text-white capitalize">
                  {supplier.status}
                </span>
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Location: {supplier.lat?.toFixed(4)}, {supplier.lng?.toFixed(4)}
              </p>
            </div>
          </div>
        </div>

        {/* ── Risk History Chart ── */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800
                        p-6 mb-6">
          <h2 className="font-bold text-white mb-4">
            Risk Score History
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
              <YAxis domain={[0, 100]} stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  background: '#111827',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Risk Events ── */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="font-bold text-white mb-4">
            Risk Events ({events.length})
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle size={36}
                className="mx-auto text-green-500/30 mb-3" />
              <p className="text-gray-500 text-sm">
                No risk events found for this supplier.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {events.map((event, i) => {
                const cfg = severityConfig[event.severity]
                  || severityConfig.low;
                return (
                  <div key={i}
                    className={`rounded-xl border p-4 ${cfg.bg}`}>
                    <div className="flex items-start gap-3">
                      {cfg.icon}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2
                                        justify-between flex-wrap">
                          <p className="font-medium text-white text-sm">
                            {event.title}
                          </p>
                          <span className={`text-xs px-2 py-0.5
                                           rounded-full font-semibold
                                           ${cfg.badge}`}>
                            {event.severity.toUpperCase()}
                          </span>
                        </div>
                        {event.description && (
                          <p className="text-xs text-gray-400 mt-1">
                            {event.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500">
                            {event.source}
                          </span>
                          {event.url && (
                            <a href={event.url} target="_blank"
                              rel="noreferrer"
                              className="text-xs text-emerald-400
                                         hover:underline">
                              Read more →
                            </a>
                          )}
                          <span className="text-xs text-gray-500 ml-auto">
                            {new Date(event.createdAt)
                              .toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}