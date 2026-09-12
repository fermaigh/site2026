"use client";

export function HiringDemo() {
  return (
    <section className="mt-16 sm:mt-20" aria-label="Hiring platform live demo">
      <h3 className="mb-8 font-sans text-[clamp(1.125rem,4vw,1.5rem)] font-semibold tracking-tight text-foreground px-4 sm:px-6">
        Hiring Platform Dashboard
      </h3>

      {/* Browser Frame */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          {/* Chrome-style toolbar */}
          <div className="bg-gray-800 border-b border-gray-700">
            {/* Traffic lights and tab bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 flex items-center gap-2 ml-2">
                <div className="text-gray-400 text-sm">◀ ▶ ⟳</div>
                <div className="flex-1 bg-gray-700 rounded-md px-3 py-1.5">
                  <div className="text-gray-300 text-xs font-mono">sprockets.ai</div>
                </div>
                <div className="text-gray-400 text-sm">★</div>
              </div>
            </div>

            {/* Navigation bar */}
            <div className="bg-white flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-4 flex-1">
                <div className="text-gray-600 text-sm">◀ ▶</div>
                <div className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 flex items-center gap-2">
                  <div className="text-gray-500 text-xs">🔒</div>
                  <div className="text-gray-600 text-xs">sprockets.ai</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">⚙️ ≡</div>
            </div>
          </div>

          {/* Dashboard Content */}
          <div className="bg-white">
            <div className="flex h-[600px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-gray-200 bg-white p-6">
                <div className="mb-8">
                  <div className="text-lg font-bold text-teal-900">Sprockets</div>
                </div>
                <nav className="space-y-2">
                  <div className="px-3 py-2 bg-cyan-100 rounded text-sm font-medium text-teal-900">
                    📊 Dashboard
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded">
                    💼 Jobs
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded">
                    👥 Applicants
                  </div>
                  <div className="px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 rounded">
                    📢 Campaigns
                  </div>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome, Oma!</h2>
                  </div>
                  <div className="flex items-center gap-3 bg-white px-4 py-2 rounded border border-gray-200">
                    <div className="w-8 h-8 bg-teal-900 rounded-full flex items-center justify-center text-white text-xs font-bold">OW</div>
                    <div>
                      <div className="text-xs font-semibold text-gray-900">Oma Warmer</div>
                      <div className="text-xs text-gray-600">oma.warmer@...</div>
                    </div>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex gap-4 mb-8">
                  <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                    <option>All locations 📍 2</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded text-sm bg-white">
                    <option>Last 7 days</option>
                  </select>
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium rounded">
                    Reset
                  </button>
                </div>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Optimize applicant sharing</h3>
                    <p className="text-xs text-gray-700 mb-3">Sprockets offers a cost-effective tool...</p>
                    <button className="text-xs font-medium text-gray-900 border border-gray-900 px-3 py-1 rounded">Get more info →</button>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Connect more apps</h3>
                    <p className="text-xs text-gray-700 mb-3">Connect background checks and WOTC apps...</p>
                    <button className="text-xs font-medium text-gray-900 border border-gray-900 px-3 py-1 rounded">View apps →</button>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <h3 className="font-bold text-sm text-gray-900 mb-1">Start a campaign</h3>
                    <p className="text-xs text-gray-700 mb-3">Sprockets Pool's campaign automatically engages...</p>
                    <button className="text-xs font-medium text-gray-900 border border-gray-900 px-3 py-1 rounded">Get more info →</button>
                  </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">High level insights</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="border-l-4 border-teal-900 pl-4">
                      <div className="text-xs text-gray-600 mb-2">Total applicants</div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">34</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">32% more</span>
                      </div>
                    </div>
                    <div className="border-l-4 border-teal-900 pl-4">
                      <div className="text-xs text-gray-600 mb-2">Avg time to contact</div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">1h 34m</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">12% less</span>
                      </div>
                    </div>
                    <div className="border-l-4 border-teal-900 pl-4">
                      <div className="text-xs text-gray-600 mb-2">Re-engagement rate</div>
                      <div className="text-2xl font-bold text-gray-900">12%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-8 py-4 text-center text-xs text-gray-600">
            © 2023 Sprockets • Terms of Service
          </div>
        </div>
      </div>
    </section>
  );
}
