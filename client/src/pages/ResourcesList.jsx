import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PackageSearch, Plus, MapPin } from 'lucide-react';

const ResourcesList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/resources');
      setResources(res.data);
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
          <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
            <PackageSearch size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Resource Inventory</h1>
            <p className="text-[#8686AC] mt-1">Cross-camp supply chain logistics and allocation.</p>
          </div>
        </div>
        <button className="flex items-center gap-2 bg-[#505081] hover:bg-[#8686AC] hover:text-[#0F0E47] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md">
          <Plus size={18} /> Allocate Supply
        </button>
      </div>

      <div className="bg-[#08072B] rounded-2xl border border-[#272757] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F0E47] border-b border-[#272757]">
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm">Resource Type</th>
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm">Location / Camp</th>
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm">Quantity</th>
                <th className="p-5 font-bold text-[#8686AC] uppercase tracking-wider text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" className="p-6 text-center text-[#8686AC]">Loading logistics link...</td></tr>
              ) : resources.length === 0 ? (
                <tr><td colSpan="4" className="p-6 text-center text-[#8686AC]">No resources tracked in the system.</td></tr>
              ) : (
                resources.map((item, idx) => {
                  const isCritical = item.quantity <= 50;
                  return (
                    <tr key={idx} className="border-b border-[#272757]/50 hover:bg-[#0F0E47]/50 transition-colors">
                      <td className="p-5 text-white font-bold">{item.resource_type || item.type}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-2 text-[#8686AC]">
                          <MapPin size={16} /> {item.camp_name || 'Central Depo'}
                        </div>
                      </td>
                      <td className="p-5">
                        <span className={`px-3 py-1 rounded-lg font-black ${isCritical ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                          {item.quantity} UNITS
                        </span>
                      </td>
                      <td className="p-5 text-right">
                        <button className="text-[#505081] hover:text-[#8686AC] font-bold text-sm px-4 py-2 border border-[#272757] hover:border-[#505081] rounded-lg transition-all">Update Stock</button>
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

export default ResourcesList;
