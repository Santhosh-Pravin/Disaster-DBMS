import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tent, Plus, Edit2, AlertCircle } from 'lucide-react';

const CampsList = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', location_id: 1, capacity: '' });

  useEffect(() => {
    fetchCamps();
  }, []);

  const fetchCamps = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/camps');
      setCamps(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCamp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/camps', formData);
      setShowModal(false);
      fetchCamps();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkFull = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/camps/${id}/status`, { status: 'Full' });
      fetchCamps();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-[#08072B] p-6 rounded-2xl border border-[#272757] shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Tent size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">Relief Camp Management</h1>
            <p className="text-[#8686AC] mt-1">Monitor capacities and deploy new safe zones.</p>
          </div>
        </div>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-2 bg-[#505081] hover:bg-[#8686AC] hover:text-[#0F0E47] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md">
          <Plus size={18} /> Add Camp
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-[#8686AC] p-6 text-xl">Loading grid...</p>
        ) : camps.map((camp, idx) => {
          // Assuming view returns camp_name, total_capacity, current_occupancy, status, id
          // If view lacks id, we adapt. For now we use idx if id is missing.
          const cid = camp.id || camp.camp_id || idx + 1;
          const occupancy = camp.current_occupancy || 0;
          const capacity = camp.total_capacity || camp.capacity || 100;
          const name = camp.camp_name || camp.name || "Unknown Camp";
          const status = camp.status || (occupancy >= capacity ? 'Full' : 'Open');
          
          const rate = (occupancy / capacity) * 100;
          const isFull = rate >= 100 || status === 'Full';

          return (
            <div key={cid} className={`relative bg-[#08072B] rounded-2xl shadow-lg border p-6 flex flex-col justify-between transition-all ${isFull ? 'border-red-500/50 hover:border-red-500' : 'border-[#272757] hover:border-[#505081]'}`}>
              {isFull && <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>}
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <h3 className="text-xl font-bold text-white tracking-wide">{name}</h3>
                {isFull ? 
                  <span className="px-3 py-1 bg-red-500/20 text-red-500 border border-red-500/30 rounded-full text-xs font-black uppercase flex items-center gap-1"><AlertCircle size={14}/> Full</span> : 
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-black uppercase">Open</span>
                }
              </div>

              <div className="space-y-4 relative z-10 block">
                <div>
                  <div className="flex justify-between text-[#8686AC] text-sm mb-1 font-medium">
                    <span>Occupancy</span>
                    <span className={isFull ? 'text-red-400 font-bold' : 'text-white'}>{occupancy} / {capacity}</span>
                  </div>
                  <div className="w-full bg-[#272757] rounded-full h-2">
                    <div className={`${isFull ? 'bg-red-500' : 'bg-[#505081]'} h-2 rounded-full transition-all duration-500`} style={{width: `${Math.min(rate, 100)}%`}}></div>
                  </div>
                </div>

                {!isFull ? (
                  <button onClick={() => handleMarkFull(cid)} className="w-full mt-4 py-2 border border-[#505081] text-[#8686AC] hover:bg-red-500/10 hover:border-red-500 hover:text-red-500 rounded-lg text-sm font-bold transition-all">
                    Mark as Full
                  </button>
                ) : (
                  <button disabled className="w-full mt-4 py-2 bg-[#0F0E47] border border-[#272757] text-[#505081] rounded-lg text-sm font-bold cursor-not-allowed">
                    At Maximum Capacity
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#08072B]/80 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#0F0E47] border border-[#505081] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-white">Deploy New Camp</h2>
              <button onClick={() => setShowModal(false)} className="text-[#8686AC] hover:text-white transition-colors">✕</button>
            </div>
            
            <form onSubmit={handleAddCamp} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#8686AC] mb-1">Camp Designation</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full bg-[#08072B] border border-[#272757] rounded-lg p-3 text-white focus:outline-none focus:border-[#8686AC]" placeholder="e.g. Alpha Sector Hub" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#8686AC] mb-1">Total Capacity (Persons)</label>
                <input required value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} type="number" className="w-full bg-[#08072B] border border-[#272757] rounded-lg p-3 text-white focus:outline-none focus:border-[#8686AC]" placeholder="e.g. 500" />
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full bg-[#505081] hover:bg-white hover:text-[#0F0E47] text-white font-bold py-3 rounded-lg transition-all shadow-md">
                  Establish Camp Protocol
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampsList;
