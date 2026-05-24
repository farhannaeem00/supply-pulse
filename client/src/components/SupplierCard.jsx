import { useNavigate } from 'react-router-dom';
import { MapPin, Tag, X } from 'lucide-react';

const riskBg = {
  secure:   'bg-green-500/10 text-green-400',
  low:      'bg-blue-500/10 text-blue-400',
  medium:   'bg-yellow-500/10 text-yellow-400',
  high:     'bg-orange-500/10 text-orange-400',
  critical: 'bg-red-500/10 text-red-400',
};

export default function SupplierCard({ supplier, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/supplier/${supplier._id}`)}
      className="px-5 py-4 border-b border-gray-800
                 hover:bg-gray-800/50 cursor-pointer
                 transition flex items-center justify-between gap-3"
    >
      {/* Left */}
      <div className="min-w-0">
        <p className="font-medium text-white text-sm truncate">
          {supplier.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={10} />
            {supplier.city ? `${supplier.city}, ` : ''}
            {supplier.country}
          </span>
          {supplier.category && (
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Tag size={10} /> {supplier.category}
            </span>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-xs font-bold px-2 py-1 rounded-full
                          ${riskBg[supplier.riskLevel] || riskBg.medium}`}>
          {supplier.riskScore}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(supplier._id);
          }}
          className="text-gray-600 hover:text-red-400 transition p-1"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}