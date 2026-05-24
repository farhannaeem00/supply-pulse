import { Link } from 'react-router-dom';
import {
  Globe, TrendingUp, Bell, Shield,
  ArrowRight, CheckCircle, Zap, Map
} from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

// ─── Feature Card ─────────────────────────────────────
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6
                  hover:border-emerald-500/50 transition">
    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl
                    flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

// ─── Stat Card ────────────────────────────────────────
const StatCard = ({ value, label }) => (
  <div className="text-center">
    <p className="text-4xl font-black text-emerald-400">{value}</p>
    <p className="text-gray-400 text-sm mt-1">{label}</p>
  </div>
);

export default function Landing() {
  usePageTitle('Supply Chain Intelligence');

  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* ── Navbar ── */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="text-emerald-400" size={24} />
            <span className="text-xl font-bold">SupplyPulse</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"
              className="text-sm text-gray-400 hover:text-white transition font-medium">
              Sign In
            </Link>
            <Link to="/register"
              className="text-sm bg-emerald-600 text-white px-4 py-2
                         rounded-lg hover:bg-emerald-700 transition font-medium">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10
                        text-emerald-400 text-sm font-medium px-4 py-2
                        rounded-full mb-6 border border-emerald-500/20">
          <Zap size={14} />
          Real-Time Supply Chain Intelligence
        </div>

        <h1 className="text-6xl font-black leading-tight mb-6">
          Monitor Your Suppliers
          <span className="text-emerald-400"> Before Risks Hit</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Track global suppliers on a live world map. Get instant risk alerts
          when news events threaten your supply chain — before disruptions cost you.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link to="/register"
            className="flex items-center gap-2 bg-emerald-600 text-white
                       px-8 py-4 rounded-xl hover:bg-emerald-700 transition
                       font-semibold text-lg shadow-lg shadow-emerald-900/50">
            Start Monitoring Free
            <ArrowRight size={20} />
          </Link>
          <Link to="/login"
            className="flex items-center gap-2 bg-gray-800 text-white
                       px-8 py-4 rounded-xl hover:bg-gray-700 transition
                       font-semibold text-lg border border-gray-700">
            Sign In
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {[
            'No credit card required',
            'Free to use',
            'Real-time updates',
          ].map(item => (
            <div key={item}
              className="flex items-center gap-2 text-gray-500 text-sm">
              <CheckCircle size={14} className="text-green-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-gray-800 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="15min"  label="Update Interval" />
            <StatCard value="100+"   label="Countries Covered" />
            <StatCard value="Live"   label="News Feed" />
            <StatCard value="100%"   label="Free to Use" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Stay Ahead
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            SupplyPulse monitors global events and scores your suppliers
            in real-time so you are never caught off guard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Map className="text-emerald-400" size={24} />}
            title="Interactive World Map"
            description="See all your suppliers on a live map with color-coded risk pins updated every 15 minutes."
          />
          <FeatureCard
            icon={<TrendingUp className="text-blue-400" size={24} />}
            title="Live Risk Scores"
            description="Every supplier gets a 0-100 risk score based on real news from their location."
          />
          <FeatureCard
            icon={<Bell className="text-yellow-400" size={24} />}
            title="Instant Alerts"
            description="Get notified the moment a supplier's risk score spikes due to local events."
          />
          <FeatureCard
            icon={<Shield className="text-purple-400" size={24} />}
            title="Risk Intelligence"
            description="See exactly what news events are driving risk for each supplier location."
          />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="bg-gray-900 border-y border-gray-800 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">
              Set up your supply chain monitor in 3 simple steps.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            {[
              {
                n: '1',
                t: 'Add Your Suppliers',
                d: 'Enter your supplier name, country and city. We find them on the map automatically.'
              },
              {
                n: '2',
                t: 'We Monitor the World',
                d: 'Our system scans global news every 15 minutes for events near your suppliers.'
              },
              {
                n: '3',
                t: 'Get Risk Alerts',
                d: 'When risks are detected, your dashboard updates in real-time with alerts and scores.'
              },
            ].map(step => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full
                                flex items-center justify-center font-bold
                                text-sm shrink-0">
                  {step.n}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{step.t}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">
          Protect Your Supply Chain Today
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
          Free forever. No credit card needed.
          Start monitoring your suppliers in minutes.
        </p>
        <Link to="/register"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white
                     px-10 py-4 rounded-xl hover:bg-emerald-700 transition
                     font-semibold text-lg shadow-lg shadow-emerald-900/50">
          Get Started Free <ArrowRight size={20} />
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-800 py-8 text-center
                         text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Globe className="text-emerald-400" size={18} />
          <span className="font-semibold text-gray-300">SupplyPulse</span>
        </div>
        <p>© {new Date().getFullYear()} SupplyPulse. Real-time supply chain intelligence.</p>
      </footer>

    </div>
  );
}