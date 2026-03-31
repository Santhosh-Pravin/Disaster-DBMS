import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, UserPlus, Phone, Briefcase } from 'lucide-react';

const VolunteersList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/volunteers');
      setVolunteers(res.data);
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
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Users size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Volunteer Network</h1>
            <p className="text-[#8686AC] mt-1">Dispatch civilian reinforcements to relief camps.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#505081] hover:bg-[#8686AC] hover:text-[#0F0E47] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md">
          <UserPlus size={18} /> Register Civilian
        </button>
      </div>

      <div className="bg-[#08072B] rounded-2xl border border-[#272757] shadow-lg overflow-hidden relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F0E47] border-b border-[#272757]">
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm">Citizen Name</th>
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm">Contact</th>
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm">Skills/Role</th>
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="p-6 text-center text-[#8686AC]">Syncing network map...</td></tr>
              ) : volunteers.length === 0 ? (
                <tr><td colSpan="4" className="p-6 text-center text-[#8686AC]">No volunteers available in registry.</td></tr>
              ) : (
                volunteers.map((vol, idx) => {
                  const isAssigned = vol.camp_id !== null || vol.status === 'Assigned';
                  return (
                    <tr key={idx} className="border-b border-[#272757]/50 hover:bg-[#0F0E47]/50 transition-colors">
                      <td className="p-5 text-white font-bold">{vol.name}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-[#8686AC]">
                          <Phone size={14} /> {vol.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-[#8686AC]">
                          <Briefcase size={14} /> {vol.skills || 'General Labor'}
                        </div>
                      </td>
                      <td className="p-5 text-right">
                        {isAssigned ? (
                          <span className="px-3 py-1 bg-[#505081]/30 text-[#8686AC] border border-[#505081] rounded-full text-xs font-black uppercase">Assigned</span>
                        ) : (
                          <button className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider rounded-lg transition-all">
                            Dispatch
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteersList;
