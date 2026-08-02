import React, { useState } from 'react';
import { User, Shield, Check, Sparkles, UserPlus, LogIn, X, BrainCircuit } from 'lucide-react';

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  avatarColor: string;
  domain: string;
  riskSensitivity: string;
  intelligenceScore: number;
  badge: string;
}

export const PRESET_ACCOUNTS: UserProfile[] = [
  {
    id: 'demo-alex',
    name: 'Alex Chen',
    role: 'Computer Science Student',
    email: 'alex.chen@university.edu',
    avatarColor: 'bg-indigo-600',
    domain: 'Academia & Tech Skills',
    riskSensitivity: 'Moderate (Academic Stress)',
    intelligenceScore: 82,
    badge: 'STUDENT PRO',
  },
  {
    id: 'demo-elena',
    name: 'Elena Vance',
    role: 'SaaS Startup Founder',
    email: 'elena@novatech.io',
    avatarColor: 'bg-emerald-600',
    domain: 'Startup Runway & Churn',
    riskSensitivity: 'High (Runway Alert)',
    intelligenceScore: 91,
    badge: 'ENTREPRENEUR',
  },
  {
    id: 'demo-marcus',
    name: 'Marcus Sterling',
    role: 'Senior Systems Engineer',
    email: 'marcus.s@enterprise.com',
    avatarColor: 'bg-amber-600',
    domain: 'Career & Automation Risk',
    riskSensitivity: 'Preventive High',
    intelligenceScore: 87,
    badge: 'CAREER SWITCHER',
  },
  {
    id: 'demo-aris',
    name: 'Dr. Aris Thorne',
    role: 'Risk Intelligence Officer',
    email: 'aris.thorne@riskai.org',
    avatarColor: 'bg-cyan-600',
    domain: 'Global Risk Matrix',
    riskSensitivity: 'Ultra Sensitive Guard',
    intelligenceScore: 95,
    badge: 'RISK OFFICER',
  },
];

interface UserAccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const UserAccountsModal: React.FC<UserAccountsModalProps> = ({
  isOpen,
  onClose,
  activeUser,
  onSelectUser,
}) => {
  const [activeTab, setActiveTab] = useState<'demo' | 'register'>('demo');

  // Registration Form State
  const [regName, setRegName] = useState('');
  const [regRole, setRegRole] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDomain, setRegDomain] = useState('Personal & Career');
  const [regSensitivity, setRegSensitivity] = useState('High');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regRole) return;

    const newUser: UserProfile = {
      id: `custom-${Date.now()}`,
      name: regName,
      role: regRole,
      email: regEmail || `${regName.toLowerCase().replace(/\s+/g, '')}@novasense.ai`,
      avatarColor: 'bg-purple-600',
      domain: regDomain,
      riskSensitivity: `${regSensitivity} Sensitivity`,
      intelligenceScore: 88,
      badge: 'REGISTERED USER',
    };

    onSelectUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#03060c] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center space-x-2 text-white font-bold text-base tracking-tight">
            <User className="w-5 h-5 text-indigo-400" />
            <span>Account Management & User Profiles</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center space-x-2 p-1 rounded-2xl bg-white/5 border border-white/10">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'demo'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Switch Demo Accounts ({PRESET_ACCOUNTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'register'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register New Custom Profile</span>
          </button>
        </div>

        {/* Demo Accounts List */}
        {activeTab === 'demo' ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-400">
              Select a pre-configured persona to test risk scanning, future simulation, and decision models tuned for specific domains:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRESET_ACCOUNTS.map((acc) => {
                const isSelected = activeUser.id === acc.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => {
                      onSelectUser(acc);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 relative overflow-hidden group ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500/10'
                        : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className={`w-9 h-9 rounded-xl ${acc.avatarColor} flex items-center justify-center text-white font-bold text-xs`}>
                          {acc.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300">
                            {acc.name}
                          </div>
                          <div className="text-[10px] text-slate-400">{acc.role}</div>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="p-1 rounded-full bg-indigo-500 text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">{acc.domain}</span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-indigo-300 font-bold uppercase tracking-wider">
                        {acc.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Custom Account Registration Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Full Name</label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Samantha Miller"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Role / Designation</label>
                <input
                  type="text"
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  placeholder="e.g. AI Researcher / Product Lead"
                  required
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="samantha@example.com"
                  className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Focus Domain</label>
                <select
                  value={regDomain}
                  onChange={(e) => setRegDomain(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#03060c] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
                >
                  <option value="Personal & Career">Personal & Career</option>
                  <option value="Academic & Exams">Academic & Exams</option>
                  <option value="Startup & Business Runway">Startup & Business Runway</option>
                  <option value="Health & Biometrics">Health & Biometrics</option>
                  <option value="Financial Growth">Financial Growth</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Risk Alert Sensitivity Threshold</label>
              <select
                value={regSensitivity}
                onChange={(e) => setRegSensitivity(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#03060c] border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50"
              >
                <option value="Standard">Standard Sensitivity (Balanced)</option>
                <option value="High">High Sensitivity (Early Warning System)</option>
                <option value="Critical Guard">Critical Guard (Zero Failure Tolerance)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center space-x-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Register & Activate Custom Persona</span>
            </button>
          </form>
        )}

        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
          <span>Active Profile: <strong className="text-slate-300">{activeUser.name} ({activeUser.role})</strong></span>
          <span>INTELLIGENCE SCORE: {activeUser.intelligenceScore}</span>
        </div>

      </div>
    </div>
  );
};
