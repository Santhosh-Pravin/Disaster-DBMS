import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, LogIn } from 'lucide-react';

const VictimsList = () => {
  const [victims, setVictims] = useState([]);
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Transfer state
  const [transferVictimId, setTransferVictimId] = useState(null);
  const [selectedCamp, setSelectedCamp] = useState('');

  const fetchData = async () => {
    try {
      const [victimsRes, campsRes] = await axios.all([
        axios.get('http://localhost:5000/api/victims'),
        axios.get('http://localhost:5000/api/camps')
      ]);
      setVictims(victimsRes.data);
      setCamps(campsRes.data.filter(c => c.status === 'Open')); // Only open camps
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    if (!selectedCamp) return alert("Select a camp first");
    
    try {
      await axios.post(`http://localhost:5000/api/victims/${transferVictimId}/transfer`, { camp_id: selectedCamp });
      setTransferVictimId(null);
      setSelectedCamp('');
      alert("Victim transferred to camp successfully.");
      // Optional: real app might refresh a shelter view here
    } catch (error) {
      console.error(error);
      alert("Failed to transfer victim.");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="text-amber-500" /> Victim Registry
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage victim records and allocate to shelters.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">ID</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Name</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Age/Gender</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Disaster Event</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Medical Status</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {victims.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-medium text-slate-500">#{v.id}</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-800">{v.name}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{v.age} / {v.gender}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{v.disaster_name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${v.medical_status === 'Critical' ? 'bg-red-100 text-red-700' : 
                        v.medical_status === 'Injured' ? 'bg-amber-100 text-amber-700' : 
                        v.medical_status === 'Healthy' ? 'bg-green-100 text-green-700' : 
                        'bg-slate-100 text-slate-700'}`}>
                      {v.medical_status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button 
                      onClick={() => setTransferVictimId(v.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 ml-auto"
                    >
                      <LogIn size={16} /> Assign Camp
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {/* Transfer Modal */}
      {transferVictimId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Transfer to Relief Camp</h2>
            <p className="text-sm text-slate-500 mb-4">Select an open relief camp to allocate this victim to. Triggers will automatically monitor the camp's capacity limit.</p>
            <form onSubmit={handleTransfer} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Available Camps (Open)</label>
                <select required value={selectedCamp} onChange={e => setSelectedCamp(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                  <option value="">Select Camp...</option>
                  {camps.map(c => <option key={c.camp_id} value={c.camp_id}>{c.camp_name} ({c.available_space} slots left)</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setTransferVictimId(null)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg">Execute Transfer</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VictimsList;
