import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShieldAlert, Users, Home, Activity, Filter, Siren, Search, MoreVertical,
  TrendingUp, Clock, Map as MapIcon, ChevronRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, Legend
} from 'recharts';

const StatCard = ({ label, value, subtext, icon: Icon, trend, colorClass }) => (
  <div className="bg-[#0F0E47] border border-[#272757] p-6 rounded-2xl relative overflow-hidden group hover:border-[#3A3A6A] transition-all">
    <div className={`absolute top-0 right-0 p-8 opacity-5 -mr-4 -mt-4 transition-transform group-hover:scale-110 ${colorClass}`}>
      <Icon size={80} />
    </div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-opacity-10 ${colorClass} bg-current`}>
          <Icon size={20} className={colorClass.replace('bg-', 'text-')} />
        </div>
        {trend && (
          <span className="text-[#10B981] text-xs font-bold flex items-center">
            <TrendingUp size={12} className="mr-1" /> {trend}
          </span>
        )}
      </div>
      <p className="text-[#8686AC] text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
      <p className="text-[#A0A0C0] text-[10px] mt-2 flex items-center">
        <Clock size={10} className="mr-1" /> {subtext}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeDisasters: [],
    victimStats: [],
    campCapacity: [],
    mostAffected: [],
    resourceShortages: []
  });
  
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [disastersRes, victimsRes, campsRes, affectedRes, shortageRes] = await Promise.all([
        axios.get('http://localhost:5000/api/dashboard/active-disasters').catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/dashboard/victim-stats').catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/dashboard/camps').catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/dashboard/most-affected-areas').catch(() => ({ data: [] })),
        axios.get('http://localhost:5000/api/dashboard/resource-shortages').catch(() => ({ data: [] }))
      ]);
      
      setStats({
        activeDisasters: disastersRes.data,
        victimStats: victimsRes.data,
        campCapacity: campsRes.data,
        mostAffected: affectedRes.data,
        resourceShortages: shortageRes.data
      });
    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-full min-h-[50vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#505081]"></div>
    </div>
  );

  const totalActive = stats.activeDisasters.length;
  const totalVictims = stats.victimStats.reduce((acc, curr) => acc + curr.total_victims, 0);
  const criticalVictims = stats.victimStats.reduce((acc, curr) => acc + curr.critical_count, 0);
  const totalCamps = stats.campCapacity.length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-2">
      
      {/* WELCOME & REFRESH */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter">Operational Overview</h2>
          <p className="text-[#8686AC] font-medium">Monitoring global disaster response in real-time.</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-[#0F0E47] border border-[#272757] rounded-xl text-xs font-bold text-[#8686AC] hover:bg-[#272757] transition-all flex items-center space-x-2">
            <Filter size={14} />
            <span className="hidden sm:inline">Filter View</span>
          </button>
          <button onClick={fetchDashboardData} className="px-4 py-2 bg-[#0F0E47] border border-[#272757] rounded-xl text-xs font-bold text-[#8686AC] hover:bg-[#272757] hover:text-white transition-all flex items-center space-x-2">
            <Activity size={14} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>
      </div>

      {/* KEY PERFORMANCE INDICATORS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Active Disasters" 
          value={totalActive.toString().padStart(2, '0')} 
          subtext="Monitoring High Severity" 
          icon={Siren} 
          colorClass="text-red-500" 
        />
        <StatCard 
          label="Total Victims" 
          value={totalVictims.toLocaleString()} 
          subtext="Registered in Database" 
          icon={Users} 
          trend="Live"
          colorClass="text-blue-500" 
        />
        <StatCard 
          label="Critical Cases" 
          value={criticalVictims.toString().padStart(4, '0')} 
          subtext="Requires Urgent Care" 
          icon={Activity} 
          colorClass="text-orange-500" 
        />
        <StatCard 
          label="Relief Camps" 
          value={totalCamps.toString()} 
          subtext="Active in region" 
          icon={Home} 
          colorClass="text-emerald-500" 
        />
      </div>

      {/* ANALYTICS & MONITORING GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LARGE CHART: Victims by Disaster */}
        <div className="lg:col-span-2 bg-[#0F0E47] border border-[#272757] p-8 rounded-3xl relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-xl font-bold text-white">Victim Analysis</h3>
              <p className="text-xs text-[#8686AC] font-medium">Breakdown of affected populaces by disaster</p>
            </div>
            <div className="flex items-center space-x-2 bg-[#08072B] p-1 rounded-lg border border-[#272757]">
              <button className="px-3 py-1 text-[10px] font-bold rounded bg-[#505081] text-white">ALL</button>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.victimStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#272757"/>
                <XAxis dataKey="disaster_name" axisLine={false} tickLine={false} tick={{fill: '#8686AC', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#8686AC', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#272757', opacity: 0.4}} 
                  contentStyle={{ backgroundColor: '#08072B', border: '1px solid #3A3A6A', borderRadius: '12px', color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{color: '#8686AC', fontSize: '12px'}} />
                <Bar dataKey="safe_count" name="Safe" stackId="a" fill="#10B981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="injured_count" name="Injured" stackId="a" fill="#F59E0B" />
                <Bar dataKey="missing_count" name="Missing" stackId="a" fill="#8686AC" />
                <Bar dataKey="critical_count" name="Critical" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SIDE COLUMN: ALERTS & RESOURCES */}
        <div className="space-y-8">
          
          {/* CRITICAL SHORTAGES */}
          <div className="bg-[#0F0E47] border border-[#272757] p-8 rounded-3xl h-[400px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Resource Shortages</h3>
              <span className="text-[#EF4444] text-[10px] font-black uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded">Critical</span>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
              {stats.resourceShortages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-[#8686AC] text-sm">All camps fully supplied.</div>
              ) : stats.resourceShortages.map((res, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-[#08072B] rounded-xl border border-[#272757] group hover:border-[#505081] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-bold text-sm text-[#E4E4F0]">{res.resource_type}</p>
                      <p className="text-[10px] font-medium text-[#8686AC] uppercase tracking-wider">{res.camp_name}</p>
                    </div>
                  </div>
                  <div className="text-red-500 font-black text-sm">
                    {res.quantity} <span className="text-xs font-medium text-[#8686AC]">REM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* TWO COLUMN LOWER DATA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CAMP OCCUPANCY TABLE */}
        <div className="bg-[#0F0E47] border border-[#272757] rounded-3xl overflow-hidden">
          <div className="p-8 border-b border-[#272757] flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Relief Camp Occupancy</h3>
              <p className="text-xs text-[#8686AC] font-medium">Monitoring capacity across {stats.campCapacity.length} active sites</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#08072B] border-b border-[#272757]">
                  <th className="px-8 py-4 text-[10px] font-black text-[#8686AC] uppercase tracking-widest">Camp Name</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#8686AC] uppercase tracking-widest">Occupancy</th>
                  <th className="px-8 py-4 text-[10px] font-black text-[#8686AC] uppercase tracking-widest">Capacity Flow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#272757]">
                {stats.campCapacity.slice(0, 5).map((camp, i) => {
                  const occupancyRate = (camp.current_occupancy / camp.total_capacity) * 100;
                  let colorClass = 'bg-[#3B82F6]';
                  let status = 'Normal';
                  if (occupancyRate > 90) { colorClass = 'bg-red-500'; status = 'Critical'; }
                  else if (occupancyRate > 75) { colorClass = 'bg-amber-500'; status = 'High'; }

                  return (
                    <tr key={i} className="hover:bg-[#08072B]/50 transition-colors group">
                      <td className="px-8 py-4">
                        <span className="text-sm font-bold text-[#E4E4F0]">{camp.camp_name}</span>
                      </td>
                      <td className="px-8 py-4">
                         <span className="text-xs font-black px-2 py-1 bg-[#272757] rounded-md text-[#8686AC]">
                          {camp.current_occupancy} / {camp.total_capacity}
                        </span>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center space-x-3 w-32">
                          <div className="w-full h-1.5 bg-[#272757] rounded-full">
                            <div className={`h-1.5 rounded-full ${colorClass}`} style={{ width: `${Math.min(occupancyRate, 100)}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold ${colorClass.replace('bg-', 'text-')}`}>{Math.round(occupancyRate)}%</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* MOST AFFECTED AREAS LIST */}
        <div className="bg-[#0F0E47] border border-[#272757] rounded-3xl overflow-hidden p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Most Affected Zones</h3>
              <p className="text-xs text-[#8686AC] font-medium">Regions requiring immediate attention</p>
            </div>
          </div>
          <div className="space-y-4 flex-1">
            {stats.mostAffected.length === 0 ? <p className="text-[#8686AC] text-sm">No areas documented currently.</p> : stats.mostAffected.slice(0, 5).map((area, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-[#08072B] rounded-xl border border-[#272757] hover:border-[#505081] transition-all cursor-default">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${area.severity === 'Critical' ? 'bg-red-500/20 text-red-500' : 'bg-orange-500/20 text-orange-500'}`}>
                    <MapIcon size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{area.region_name}</p>
                    <p className="text-[10px] font-bold text-[#8686AC] mt-0.5 uppercase tracking-wider">{area.disaster_name} &bull; <span className={area.severity === 'Critical' ? 'text-red-400' : 'text-orange-400'}>{area.severity} Severity</span></p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                   <div className="bg-[#272757] px-3 py-1 rounded text-white text-xs font-black shadow-inner">
                    {area.population_affected.toLocaleString()}
                  </div>
                  <span className="text-[9px] text-[#8686AC] uppercase tracking-widest mt-1">Affected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;

