import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MonitorCheck, Shield, ChevronRight, Map } from 'lucide-react';

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/teams');
      setTeams(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#08072B] p-6 rounded-2xl border border-[#272757] shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
            <MonitorCheck size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Rescue Team Dispatch</h1>
            <p className="text-[#8686AC] mt-1">Manage unit readiness and active deployments.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#505081] hover:bg-[#8686AC] hover:text-[#0F0E47] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md">
          <Shield size={18} /> Deploy Unit
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-[#8686AC] p-6 text-xl">Loading rosters...</p>
        ) : teams.length === 0 ? (
          <div className="col-span-full bg-[#08072B] border border-[#272757] rounded-2xl p-8 text-center">
            <p className="text-[#8686AC]">No active rescue teams registered.</p>
          </div>
        ) : (
          teams.map((team, idx) => {
            const isDeployed = team.status === 'Deployed' || team.deployment_id !== null;
            return (
              <div key={idx} className="bg-[#08072B] rounded-2xl shadow-lg border border-[#272757] p-6 flex flex-col justify-between hover:border-[#505081] transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{team.team_name || team.name}</h3>
                    <p className="text-sm font-medium text-[#8686AC] mt-1">{team.specialty || team.type || 'General Response'}</p>
                  </div>
                  {isDeployed ? (
                    <span className="px-3 py-1 bg-[#505081]/30 text-[#8686AC] border border-[#505081] rounded-full text-xs font-black uppercase">Deployed</span>
                  ) : (
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black uppercase flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div> Ready
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-[#0F0E47] p-3 rounded-lg border border-[#272757]">
                    <Map size={16} className={isDeployed ? "text-amber-500" : "text-[#505081]"} />
                    <span className={isDeployed ? "text-amber-100 font-medium" : "text-[#8686AC] font-medium"}>
                      {isDeployed ? team.location || 'Active Zone' : 'Standby at Base'}
                    </span>
                  </div>
                  
                  <button className="w-full flex justify-between items-center px-4 py-3 bg-[#0F0E47] hover:bg-[#272757] border border-[#272757] hover:border-[#505081] text-white rounded-lg text-sm font-bold transition-all group-hover:shadow-[0_0_10px_rgba(39,39,87,0.5)]">
                    {isDeployed ? 'View Intel' : 'Assign Mission'}
                    <ChevronRight size={16} className="text-[#8686AC]" />
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
};

export default TeamsList;
