import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Globe, Plus, LogOut, RefreshCw,
  AlertTriangle, CheckCircle, AlertCircle,
  TrendingUp, X, Menu
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';
import { io } from 'socket.io-client';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ─── Socket Connection ────────────────────────────────
const socket = io(
  import.meta.env.VITE_API_URL?.replace('/api', '') ||
  'http://localhost:5000'
);

// ─── Risk Colors ──────────────────────────────────────
const riskColors = {
  secure:   '#22c55e',
  low:      '#3b82f6',
  medium:   '#eab308',
  high:     '#f97316',
  critical: '#ef4444',
};

const riskBg = {
  secure:   'bg-green-500/10 text-green-400',
  low:      'bg-blue-500/10 text-blue-400',
  medium:   'bg-yellow-500/10 text-yellow-400',
  high:     'bg-orange-500/10 text-orange-400',
  critical: 'bg-red-500/10 text-red-400',
};

// ─── Add Supplier Modal ───────────────────────────────
const AddSupplierModal = ({ onClose, onAdd }) => {
  const [form, setForm]     = useState({
    name: '', country: '', city: '',
    lat: '', lng: '', category: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.lat || !form.lng)
      return toast.error('Please fill all required fields');

    setLoading(true);
    try {
      const { data } = await api.post('/suppliers', form);
      toast.success('Supplier added! Scoring risk...');
      onAdd(data.data);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add supplier');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `w-full px-4 py-2.5 rounded-xl bg-gray-800
    border border-gray-700 text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-emerald-500
    focus:border-transparent transition placeholder-gray-500`;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center
                    justify-center z-[1000] px-4">
      <div className="bg-gray-900 rounded-2xl border border-gray-800
                      p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Add Supplier</h2>
          <button onClick={onClose}
            className="text-gray-400 hover:text-white transition">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Supplier Name *
            </label>
            <input name="name" value={form.name}
              onChange={handleChange} placeholder="Samsung Electronics"
              className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Country *
              </label>
              <input name="country" value={form.country}
                onChange={handleChange} placeholder="South Korea"
                className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">City</label>
              <input name="city" value={form.city}
                onChange={handleChange} placeholder="Seoul"
                className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Latitude *
              </label>
              <input name="lat" value={form.lat}
                onChange={handleChange} placeholder="37.5665"
                className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1 block">
                Longitude *
              </label>
              <input name="lng" value={form.lng}
                onChange={handleChange} placeholder="126.9780"
                className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-1 block">
              Category
            </label>
            <input name="category" value={form.category}
              onChange={handleChange} placeholder="Electronics"
              className={inputClass} />
          </div>

          <div className="bg-gray-800 rounded-xl p-3 mt-1">
            <p className="text-xs text-gray-400">
              💡 Find coordinates at{' '}
              <a href="https://www.latlong.net" target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline">
                latlong.net
              </a>
            </p>
          </div>

          <div className="flex gap-3 mt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-gray-700
                         text-gray-400 hover:text-white transition text-sm">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white
                         hover:bg-emerald-700 disabled:opacity-50 transition
                         text-sm font-semibold">
              {loading ? 'Adding...' : 'Add Supplier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────
export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user, logout }          = useAuth();
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [alerts, setAlerts]       = useState([]);
  const navigate                  = useNavigate();

  useEffect(() => {
    fetchSuppliers();

    // ── Socket.io Events ──
    socket.on('supplier:added', (supplier) => {
      setSuppliers(prev => [supplier, ...prev]);
    });

    socket.on('supplier:riskUpdated', ({ supplierId, riskScore, riskLevel, status }) => {
      setSuppliers(prev => prev.map(s =>
        s._id === supplierId
          ? { ...s, riskScore, riskLevel, status }
          : s
      ));
    });

    socket.on('supplier:deleted', ({ id }) => {
      setSuppliers(prev => prev.filter(s => s._id !== id));
    });

    socket.on('risk:alert', (alert) => {
      setAlerts(prev => [alert, ...prev.slice(0, 4)]);
      toast.error(`⚠️ ${alert.supplierName} risk increased!`);
    });

    return () => {
      socket.off('supplier:added');
      socket.off('supplier:riskUpdated');
      socket.off('supplier:deleted');
      socket.off('risk:alert');
    };
  }, []);

  const fetchSuppliers = async () => {
    try {
      const { data } = await api.get('/suppliers');
      setSuppliers(data.data);
    } catch {
      toast.error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this supplier?')) return;
    try {
      await api.delete(`/suppliers/${id}`);
      setSuppliers(prev => prev.filter(s => s._id !== id));
      toast.success('Supplier deleted');
    } catch {
      toast.error('Failed to delete supplier');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await api.post('/suppliers/refresh');
      toast.success('Risk scores refreshing...');
    } catch {
      toast.error('Failed to refresh scores');
    } finally {
      setTimeout(() => setRefreshing(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out');
  };

  // ── Stats ──
  const total    = suppliers.length;
  const atRisk   = suppliers.filter(s =>
    s.riskLevel === 'high' || s.riskLevel === 'critical'
  ).length;
  const avgScore = total
    ? Math.round(suppliers.reduce((a, s) => a + s.riskScore, 0) / total)
    : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Navbar ── */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="text-emerald-400" size={22} />
            <span className="text-xl font-bold">SupplyPulse</span>
          </div>

          {/* Desktop */}
          <div className="hidden sm:flex items-center gap-4">
            <span className="text-sm text-gray-400">
              Hello, <span className="font-semibold text-white">
                {user?.name}
              </span>
            </span>
            <button onClick={handleRefresh} disabled={refreshing}
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-white transition">
              <RefreshCw size={16}
                className={refreshing ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white
                         px-4 py-2 rounded-lg hover:bg-emerald-700 transition
                         font-medium text-sm">
              <Plus size={16} /> Add Supplier
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-red-400 transition">
              <LogOut size={16} /> Logout
            </button>
          </div>

          {/* Mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden text-gray-400 hover:text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-800
                          flex flex-col gap-3">
            <button onClick={() => { setShowModal(true); setMenuOpen(false); }}
              className="flex items-center gap-2 bg-emerald-600 text-white
                         px-4 py-2 rounded-lg text-sm font-medium w-fit">
              <Plus size={16} /> Add Supplier
            </button>
            <button onClick={handleRefresh}
              className="flex items-center gap-2 text-sm text-gray-400 w-fit">
              <RefreshCw size={16}
                className={refreshing ? 'animate-spin' : ''} />
              Refresh Scores
            </button>
            <button onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-gray-400
                         hover:text-red-400 w-fit">
              <LogOut size={16} /> Logout
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 rounded-2xl border border-gray-800
                          p-5 text-center">
            <p className="text-3xl font-black text-emerald-400">{total}</p>
            <p className="text-gray-400 text-sm mt-1">Total Suppliers</p>
          </div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800
                          p-5 text-center">
            <p className="text-3xl font-black text-red-400">{atRisk}</p>
            <p className="text-gray-400 text-sm mt-1">At Risk</p>
          </div>
          <div className="bg-gray-900 rounded-2xl border border-gray-800
                          p-5 text-center">
            <p className="text-3xl font-black text-blue-400">{avgScore}</p>
            <p className="text-gray-400 text-sm mt-1">Avg Score</p>
          </div>
        </div>

        {/* ── Alerts ── */}
        {alerts.length > 0 && (
          <div className="mb-6 flex flex-col gap-2">
            {alerts.map((alert, i) => (
              <div key={i}
                className="bg-red-500/10 border border-red-500/20
                           rounded-xl px-4 py-3 flex items-center gap-3">
                <AlertTriangle className="text-red-400 shrink-0" size={16} />
                <p className="text-sm text-red-300">{alert.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── World Map ── */}
          <div className="lg:col-span-2 bg-gray-900 rounded-2xl
                          border border-gray-800 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-800
                            flex items-center justify-between">
              <h2 className="font-bold text-white flex items-center gap-2">
                <Globe className="text-emerald-400" size={18} />
                Live Supplier Map
              </h2>
              <div className="flex items-center gap-3 text-xs">
                {Object.entries(riskColors).map(([level, color]) => (
                  <div key={level} className="flex items-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: color }} />
                    <span className="text-gray-400 capitalize">{level}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ height: '400px' }}>
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                {suppliers.map(supplier => (
                  <CircleMarker
                    key={supplier._id}
                    center={[supplier.lat, supplier.lng]}
                    radius={10}
                    fillColor={riskColors[supplier.riskLevel] || '#eab308'}
                    color={riskColors[supplier.riskLevel] || '#eab308'}
                    weight={2}
                    opacity={0.9}
                    fillOpacity={0.7}
                  >
                    <Popup>
                      <div style={{ minWidth: '150px' }}>
                        <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                          {supplier.name}
                        </p>
                        <p style={{ fontSize: '12px', color: '#666' }}>
                          {supplier.city}, {supplier.country}
                        </p>
                        <p style={{ fontSize: '12px', marginTop: '4px' }}>
                          Risk Score:{' '}
                          <strong>{supplier.riskScore}/100</strong>
                        </p>
                        <p style={{ fontSize: '12px', textTransform: 'capitalize' }}>
                          Level: <strong>{supplier.riskLevel}</strong>
                        </p>
                      </div>
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* ── Supplier List ── */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800">
            <div className="px-5 py-4 border-b border-gray-800
                            flex items-center justify-between">
              <h2 className="font-bold text-white flex items-center gap-2">
                <TrendingUp className="text-emerald-400" size={18} />
                Suppliers ({total})
              </h2>
              <button onClick={() => setShowModal(true)}
                className="text-emerald-400 hover:text-emerald-300 transition">
                <Plus size={20} />
              </button>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: '400px' }}>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-6 h-6 border-4 border-emerald-500
                                  border-t-transparent rounded-full
                                  animate-spin" />
                </div>
              ) : suppliers.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <Globe size={36}
                    className="mx-auto text-gray-700 mb-3" />
                  <p className="text-gray-500 text-sm">
                    No suppliers yet
                  </p>
                  <button onClick={() => setShowModal(true)}
                    className="mt-3 text-emerald-400 text-sm
                               hover:underline">
                    Add your first supplier
                  </button>
                </div>
              ) : (
                suppliers.map(supplier => (
                  <div
                    key={supplier._id}
                    onClick={() => navigate(`/supplier/${supplier._id}`)}
                    className="px-5 py-4 border-b border-gray-800
                               hover:bg-gray-800/50 cursor-pointer
                               transition flex items-center
                               justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-white text-sm truncate">
                        {supplier.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {supplier.city
                          ? `${supplier.city}, `
                          : ''}{supplier.country}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs font-bold px-2 py-1
                                        rounded-full ${riskBg[supplier.riskLevel]
                                          || riskBg.medium}`}>
                        {supplier.riskScore}
                      </span>
                      <button
                        onClick={(e) => handleDelete(supplier._id, e)}
                        className="text-gray-600 hover:text-red-400
                                   transition p-1">
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

      {/* ── Add Supplier Modal ── */}
      {showModal && (
        <AddSupplierModal
          onClose={() => setShowModal(false)}
          onAdd={(supplier) => {
            setSuppliers(prev => [supplier, ...prev]);
          }}
        />
      )}

    </div>
  );
}
