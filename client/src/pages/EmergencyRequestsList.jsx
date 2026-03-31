import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShieldAlert } from 'lucide-react';

const EmergencyRequestsList = () => {
  const [requests, setRequests] = null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-100 text-red-800 rounded-lg">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Emergency Requests</h2>
            <p className="text-sm text-slate-500">Track and fulfill urgent community requests</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition-colors">
          Raise Alert
        </button>
      </div>

      <div className="p-8 text-center text-slate-500">
        <p>No active emergency requests pending resolution.</p>
      </div>
    </div>
  );
};
export default EmergencyRequestsList;
