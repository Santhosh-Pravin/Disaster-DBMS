import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, ShieldAlert } from 'lucide-react';

const DisastersList = () => {
  const [disasters, setDisasters] = useState([]);
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', type_id: '', location_id: '', severity: 'Medium', description: ''
  });

  const fetchData = async () => {
    try {
      const [disRes, typeRes, locRes] = await Promise.all([
        axios.get('http://localhost:5000/api/disasters'),
        axios.get('http://localhost:5000/api/disasters/types'),
        axios.get('http://localhost:5000/api/disasters/locations')
      ]);
      setDisasters(disRes.data);
      setTypes(typeRes.data);
      setLocations(locRes.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/disasters', formData);
      setShowModal(false);
      setFormData({ name: '', type_id: '', location_id: '', severity: 'Medium', description: ''});
      fetchData(); // Refresh list
    } catch (error) {
      console.error("Error creating disaster", error);
      alert("Failed to register disaster.");
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <ShieldAlert className="text-red-500" /> Disasters Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">Register and monitor all registered disaster events.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={18} /> Register Event
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Name</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Type</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Location</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Severity</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Status</th>
                <th className="py-3 px-4 text-sm font-semibold text-slate-600">Reported</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {disasters.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 text-sm font-medium text-slate-800">{d.name}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{d.type_name}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{d.city}, {d.region}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${d.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                        d.severity === 'High' ? 'bg-orange-100 text-orange-700' : 
                        d.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-green-100 text-green-700'}`}>
                      {d.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold
                      ${d.status === 'Active' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500">{new Date(d.date_reported).toLocaleDateString()}</td>
                </tr>
              ))}
              {disasters.length === 0 && (
                <tr><td colSpan="6" className="py-4 text-center text-slate-500">No active disasters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Register New Disaster</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Event Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="e.g. Hurricane Delta" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select required value={formData.type_id} onChange={e => setFormData({...formData, type_id: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                    <option value="">Select Type...</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.type_name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <select required value={formData.location_id} onChange={e => setFormData({...formData, location_id: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                    <option value="">Select Location...</option>
                    {locations.map(l => <option key={l.id} value={l.id}>{l.city}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
                <select value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Brief circumstances..."></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">Register Event</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisastersList;
