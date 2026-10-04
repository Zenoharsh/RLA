export default function InteractiveTacticalMap() {
  return (
    <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-surface-container-lowest p-6 sm:p-8 shadow-sm">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">radar</span>
          <span className="font-headline-sm text-headline-sm text-on-surface">Indo-Pacific & Continental Watch</span>
        </div>
        <span className="font-label-caps text-label-caps text-on-surface-variant font-mono">COORD: 34.0479° N, 78.8475° E</span>
      </div>

      <div className="relative w-full h-80 sm:h-96 rounded-2xl bg-surface-container overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-center opacity-70"></div>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
          <line stroke="#181c1c" strokeDasharray="4 4" strokeOpacity="0.08" x1="0" x2="600" y1="100" y2="100"></line>
          <line stroke="#181c1c" strokeDasharray="4 4" strokeOpacity="0.08" x1="0" x2="600" y1="200" y2="200"></line>
          <line stroke="#181c1c" strokeDasharray="4 4" strokeOpacity="0.08" x1="0" x2="600" y1="300" y2="300"></line>
          <line stroke="#181c1c" strokeDasharray="4 4" strokeOpacity="0.08" x1="200" x2="200" y1="0" y2="400"></line>
          <line stroke="#181c1c" strokeDasharray="4 4" strokeOpacity="0.08" x1="400" x2="400" y1="0" y2="400"></line>
          
          <g className="cursor-pointer">
            <circle cx="310" cy="130" fill="#ba0939" fillOpacity="0.2" r="16"></circle>
            <circle cx="310" cy="130" fill="#ba0939" r="5"></circle>
            <text fill="#181c1c" fontFamily="Space Grotesk" fontSize="11" fontWeight="600" x="325" y="134">AKSAI CHIN: NEW COUNTIES</text>
          </g>
          <g className="cursor-pointer">
            <circle cx="430" cy="270" fill="#51616a" fillOpacity="0.2" r="14"></circle>
            <circle cx="430" cy="270" fill="#51616a" r="4"></circle>
            <text fill="#181c1c" fontFamily="Space Grotesk" fontSize="11" fontWeight="600" x="445" y="274">MALACCA PASSAGE PATROL</text>
          </g>
          <g className="cursor-pointer">
            <circle cx="160" cy="220" fill="#ba0939" fillOpacity="0.2" r="14"></circle>
            <circle cx="160" cy="220" fill="#ba0939" r="4"></circle>
            <text fill="#181c1c" fontFamily="Space Grotesk" fontSize="11" fontWeight="600" x="70" y="224">DUQM HYDROGEN TERMINAL</text>
          </g>
          <path d="M 160 220 Q 230 225 280 230" fill="none" opacity="0.6" stroke="#ba0939" strokeDasharray="3 3" strokeWidth="1.5"></path>
        </svg>
        <div className="absolute bottom-3 left-3 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md p-3 shadow-md">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-error">
              <span className="h-2 w-2 rounded-full bg-error animate-pulse"></span>
              <span className="font-label-caps text-label-caps font-bold">HIGH ALERT: NORTHERN COMMAND</span>
            </div>
            <span className="font-label-caps text-label-caps text-on-surface-variant">INFRASTRUCTURE DENSITY +14% YoY</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-4 text-center">
        <div className="rounded-xl bg-surface-container-low p-2.5">
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Subsea Cables Active</span>
          <p className="font-headline-sm text-body-md text-on-surface font-semibold">18 Corridors</p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-2.5">
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Naval Surface Sorties</span>
          <p className="font-headline-sm text-body-md text-primary font-semibold">44 Vessels</p>
        </div>
        <div className="rounded-xl bg-surface-container-low p-2.5">
          <span className="font-label-caps text-[10px] text-on-surface-variant uppercase">Border Stations Monitored</span>
          <p className="font-headline-sm text-body-md text-secondary font-semibold">12 Sectors</p>
        </div>
      </div>
    </div>
  );
}
