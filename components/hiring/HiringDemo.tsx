"use client";

export function HiringDemo() {
  return (
    <section className="mt-16 sm:mt-20" aria-label="Hiring platform live demo">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .hiring-demo-container > * {
          animation: slideUp 0.6s ease-out forwards;
        }

        .hiring-demo-container > :nth-child(1) { animation-delay: 0ms; }
        .hiring-demo-container > :nth-child(2) { animation-delay: 150ms; }

        .browser-frame {
          animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .sidebar-nav > * {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .sidebar-nav > :nth-child(1) { animation-delay: 300ms; }
        .sidebar-nav > :nth-child(2) { animation-delay: 350ms; }
        .sidebar-nav > :nth-child(3) { animation-delay: 400ms; }
        .sidebar-nav > :nth-child(4) { animation-delay: 450ms; }

        .dashboard-card {
          animation: slideUp 0.5s ease-out forwards;
        }

        .dashboard-card:nth-child(1) { animation-delay: 500ms; }
        .dashboard-card:nth-child(2) { animation-delay: 550ms; }
        .dashboard-card:nth-child(3) { animation-delay: 600ms; }

        .stats-section {
          animation: slideUp 0.6s ease-out forwards;
          animation-delay: 700ms;
        }

        .blur-background {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>

      <div className="hiring-demo-container">
        <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground px-4 sm:px-6">
          Hiring Platform Dashboard
        </h3>

        {/* Background with blur effect */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="blur-background absolute -inset-6 bg-gradient-to-br from-blue-100/30 via-purple-50/20 to-blue-50/30 rounded-2xl blur-3xl -z-10 dark:from-blue-900/20 dark:via-purple-900/10 dark:to-blue-900/20"></div>

          {/* Browser Frame */}
          <div className="browser-frame bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700/50 backdrop-blur-sm">
            {/* Chrome-style toolbar */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 border-b border-slate-700/50">
              {/* Traffic lights and tab bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                </div>
                <div className="flex-1 flex items-center gap-2 ml-2">
                  <div className="text-slate-400 text-sm opacity-60">◀ ▶ ⟳</div>
                  <div className="flex-1 bg-slate-700/60 backdrop-blur rounded-md px-3 py-1.5 border border-slate-600/30 hover:bg-slate-700/80 transition-colors">
                    <div className="text-slate-200 text-xs font-mono">sprockets.ai</div>
                  </div>
                  <div className="text-slate-400 text-sm opacity-60">★</div>
                </div>
              </div>

              {/* Navigation bar */}
              <div className="bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 flex items-center justify-between px-4 py-2 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-slate-600 dark:text-slate-400 text-sm opacity-60">◀ ▶</div>
                  <div className="flex-1 bg-slate-200/50 dark:bg-slate-700/50 backdrop-blur rounded-full px-4 py-1.5 flex items-center gap-2 border border-slate-300/30 dark:border-slate-600/30 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 transition-colors">
                    <div className="text-slate-600 dark:text-slate-300 text-xs">🔒</div>
                    <div className="text-slate-700 dark:text-slate-300 text-xs">sprockets.ai</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-sm opacity-60">⚙️ ≡</div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="bg-white dark:bg-slate-950">
              <div className="flex h-[600px]">
                {/* Sidebar */}
                <div className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
                  <div className="mb-8">
                    <div className="text-lg font-bold text-teal-900 dark:text-teal-400">Sprockets</div>
                  </div>
                  <nav className="sidebar-nav space-y-2">
                    <div className="px-3 py-2 bg-cyan-100/80 dark:bg-cyan-900/30 rounded-lg text-sm font-medium text-teal-900 dark:text-teal-300 hover:bg-cyan-200/80 dark:hover:bg-cyan-900/50 transition-colors cursor-pointer">
                      📊 Dashboard
                    </div>
                    <div className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer">
                      💼 Jobs
                    </div>
                    <div className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer">
                      👥 Applicants
                    </div>
                    <div className="px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg transition-colors cursor-pointer">
                      📢 Campaigns
                    </div>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-8 overflow-y-auto">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Welcome, Oma!</h2>
                    </div>
                    <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <div className="w-8 h-8 bg-teal-900 dark:bg-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">OW</div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">Oma Warmer</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">oma.warmer@...</div>
                      </div>
                    </div>
                  </div>

                  {/* Filter Bar */}
                  <div className="flex gap-4 mb-8">
                    <select className="px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer">
                      <option>All locations 📍 2</option>
                    </select>
                    <select className="px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors cursor-pointer">
                      <option>Last 7 days</option>
                    </select>
                    <button className="px-4 py-2 bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-400 dark:hover:bg-slate-600 transition-colors">
                      Reset
                    </button>
                  </div>

                  {/* Quick Action Cards */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="dashboard-card bg-blue-100/70 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200/50 dark:border-blue-800/50 hover:bg-blue-100/90 dark:hover:bg-blue-900/50 transition-colors">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Optimize applicant sharing</h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">Sprockets offers a cost-effective tool...</p>
                      <button className="text-xs font-medium text-slate-900 dark:text-white border border-slate-900 dark:border-white px-3 py-1 rounded hover:bg-slate-900/10 dark:hover:bg-white/10 transition-colors">Get more info →</button>
                    </div>
                    <div className="dashboard-card bg-green-100/70 dark:bg-green-900/30 p-4 rounded-lg border border-green-200/50 dark:border-green-800/50 hover:bg-green-100/90 dark:hover:bg-green-900/50 transition-colors">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Connect more apps</h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">Connect background checks and WOTC apps...</p>
                      <button className="text-xs font-medium text-slate-900 dark:text-white border border-slate-900 dark:border-white px-3 py-1 rounded hover:bg-slate-900/10 dark:hover:bg-white/10 transition-colors">View apps →</button>
                    </div>
                    <div className="dashboard-card bg-yellow-100/70 dark:bg-yellow-900/30 p-4 rounded-lg border border-yellow-200/50 dark:border-yellow-800/50 hover:bg-yellow-100/90 dark:hover:bg-yellow-900/50 transition-colors">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1">Start a campaign</h3>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mb-3">Sprockets Pool's campaign automatically engages...</p>
                      <button className="text-xs font-medium text-slate-900 dark:text-white border border-slate-900 dark:border-white px-3 py-1 rounded hover:bg-slate-900/10 dark:hover:bg-white/10 transition-colors">Get more info →</button>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="stats-section bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md dark:hover:shadow-lg transition-shadow">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-4">High level insights</h3>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="border-l-4 border-teal-900 dark:border-teal-500 pl-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 px-4 py-2 rounded transition-colors">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Total applicants</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">34</span>
                          <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded">32% more</span>
                        </div>
                      </div>
                      <div className="border-l-4 border-teal-900 dark:border-teal-500 pl-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 px-4 py-2 rounded transition-colors">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Avg time to contact</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-slate-900 dark:text-white">1h 34m</span>
                          <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 px-2 py-1 rounded">12% less</span>
                        </div>
                      </div>
                      <div className="border-l-4 border-teal-900 dark:border-teal-500 pl-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 px-4 py-2 rounded transition-colors">
                        <div className="text-xs text-slate-600 dark:text-slate-400 mb-2">Re-engagement rate</div>
                        <div className="text-2xl font-bold text-slate-900 dark:text-white">12%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-8 py-4 text-center text-xs text-slate-600 dark:text-slate-400">
              © 2023 Sprockets • Terms of Service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
