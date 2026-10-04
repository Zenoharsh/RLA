export default function StrategicQuoteBanner() {
  return (
    <section className="w-full bg-surface-container-low py-16 lg:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-surface-container-lowest p-8 sm:p-14 lg:p-16 overflow-hidden shadow-[0_4px_24px_-4px_rgba(27,42,50,0.06)]">
          {/* Left red accent bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
          {/* Decorative large quote mark */}
          <div className="absolute right-10 top-6 font-label-numeric text-[160px] leading-none text-on-surface/5 select-none pointer-events-none">
            "
          </div>
          <div className="max-w-4xl space-y-6 relative z-10">
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">
              INSTITUTIONAL CHARTER // STRATEGIC DISPATCH
            </span>
            <blockquote className="font-headline-lg text-headline-lg sm:text-[32px] sm:leading-[42px] text-on-surface font-light leading-snug">
              "The emerging multilateral dynamic is no longer governed by binary cold war blocs, but by the relentless pragmatism of multi-alignment, technological self-reliance, and secure supply corridors."
            </blockquote>
            <div className="flex items-center gap-4 pt-2">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-[13px] shrink-0">
                RLA
              </div>
              <div>
                <p className="font-body-md font-semibold text-on-surface">Directorate of International Affairs</p>
                <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                  Red Lantern Analytica • New Delhi Headquarters
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
