import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Activity, Users, Tent, PackageSearch, ShieldAlert, MonitorCheck,
  Siren, Search, Bell, Settings, Plus, LogOut
} from 'lucide-react';

import Landing from './pages/Landing';
import Login from './pages/Login';

import Dashboard from './pages/Dashboard';
import DisastersList from './pages/DisastersList';
import VictimsList from './pages/VictimsList';
import CampsList from './pages/CampsList';
import ResourcesList from './pages/ResourcesList';
import TeamsList from './pages/TeamsList';
import AffectedAreasList from './pages/AffectedAreasList';
import VolunteersList from './pages/VolunteersList';
import EmergencyRequestsList from './pages/EmergencyRequestsList';

const sidebarItems = [
  { path: '/dashboard', name: 'Reports & Analysis', icon: <Activity /> },
  { path: '/dashboard/disasters', name: 'Disasters', icon: <ShieldAlert /> },
  { path: '/dashboard/victims', name: 'Victims', icon: <Users /> },
  { path: '/dashboard/camps', name: 'Relief Camps', icon: <Tent /> },
  { path: '/dashboard/resources', name: 'Resources', icon: <PackageSearch /> },
  { path: '/dashboard/teams', name: 'Rescue Teams', icon: <MonitorCheck /> },
  { path: '/dashboard/affected-areas', name: 'Affected Areas', icon: <Activity /> },
  { path: '/dashboard/volunteers', name: 'Volunteers', icon: <Users /> },
  { path: '/dashboard/emergencies', name: 'Emergencies', icon: <ShieldAlert /> }
];

const DashboardLayout = () => {
  const location = useLocation();
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex h-screen bg-[#0F0E47] text-[#8686AC] font-sans selection:bg-[#505081]/30">
      {/* Sidebar */}
      <aside className="w-72 bg-[#08072B] border-r border-[#272757] hidden md:flex flex-col sticky top-0 h-screen">
        <div className="flex items-center space-x-3 mb-10 p-6 pb-2">
          <div className="w-10 h-10 bg-[#505081] rounded-xl flex items-center justify-center shadow-lg shadow-[#505081]/40 border border-[#8686AC]/30">
            <Siren size={24} className="text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-black text-white tracking-tighter">CRISIS<span className="text-[#8686AC]">RESPONSE</span></h1>
            <p className="text-[10px] text-[#8686AC] font-bold tracking-widest uppercase">Admin Portal v4.2</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {sidebarItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-[#505081] text-white shadow-lg shadow-[#505081]/20' 
                    : 'text-[#8686AC] hover:bg-[#272757] hover:text-white'
                }`}
              >
                {React.cloneElement(item.icon, { size: 20, className: isActive ? 'text-white' : 'group-hover:text-[#8686AC]' })}
                <span className="font-semibold text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-6 pt-6 border-t border-[#272757] space-y-4">
          <div className="flex items-center space-x-3 p-2 bg-[#0F0E47] rounded-xl border border-[#272757]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#505081] to-[#8686AC] flex items-center justify-center font-bold text-white shadow-inner">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin Active</p>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tight">System Online</p>
            </div>
            <Link to="/" className="text-[#8686AC] hover:text-white transition-colors p-2">
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0F0E47]">
        {/* Top Header */}
        <header className="h-20 border-b border-[#272757] flex items-center justify-between px-8 bg-[#08072B]/90 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative w-full max-w-md hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8686AC]" />
              <input 
                type="text" 
                placeholder="Search victims, resources, or teams..." 
                className="w-full bg-[#0F0E47] border border-[#272757] rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#505081] transition-all text-white placeholder-[#8686AC]"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex flex-col items-end mr-4">
              <p className="text-xs font-bold text-[#8686AC] uppercase tracking-widest">Global Timestamp</p>
              <p className="text-sm font-mono text-white font-bold">{time}</p>
            </div>
            <button className="relative p-2 text-[#8686AC] hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#505081] rounded-full border-2 border-[#08072B]"></span>
            </button>
            <button className="p-2 text-[#8686AC] hover:text-white transition-colors">
              <Settings size={20} />
            </button>
            <button className="bg-[#505081] hover:bg-[#8686AC] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-[#505081]/20 flex items-center space-x-2 transition-all active:scale-95">
              <Plus size={16} />
              <span className="hidden sm:inline">Report Emergency</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto bg-[#0F0E47]">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="disasters" element={<DisastersList />} />
            <Route path="victims" element={<VictimsList />} />
            <Route path="camps" element={<CampsList />} />
            <Route path="resources" element={<ResourcesList />} />
            <Route path="teams" element={<TeamsList />} />
            <Route path="affected-areas" element={<AffectedAreasList />} />
            <Route path="volunteers" element={<VolunteersList />} />
            <Route path="emergencies" element={<EmergencyRequestsList />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;

