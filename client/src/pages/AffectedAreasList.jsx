import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from 'lucide-react';

const AffectedAreasList = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch from /api/affected-areas
    // For now we'll simulate the data based on the API we built
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/affected-areas');
      setAreas(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 text-blue-800 rounded-lg">
            <Activity size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Affected Areas</h2>
            <p className="text-sm text-slate-500">Manage impacted regions and tracked populations</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#505081] text-white rounded-lg hover:bg-[#272757] font-medium transition-colors">
          + Log New Area
        </button>
      </div>

      <div className="p-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
              <th className="p-4 font-medium">Disaster Event</th>
              <th className="p-4 font-medium">Region Name</th>
              <th className="p-4 font-medium">Population Affected</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500">Loading areas...</td></tr>
            ) : areas.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-slate-500">No affected areas logged yet.</td></tr>
            ) : (
              areas.map((area) => (
                <tr key={area.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 text-slate-800 font-medium">{area.disaster_name}</td>
                  <td className="p-4 text-slate-600">{area.region_name}</td>
                  <td className="p-4 text-slate-600">{area.population_affected.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Map</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AffectedAreasList;
