import Footer from "@/components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex flex-col items-center justify-center overflow-hidden">
        {/* Placeholder for the desk/coffee image from the original site */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/scenic mountain.jpg')" }} // Using the high-res asset we have for a premium feel
        />
        {/* Dark overlay with elegant gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <h1 className="font-display-hero text-[42px] sm:text-[56px] text-white tracking-tight drop-shadow-md mb-2">
            About RLA
          </h1>
          <div className="flex items-center gap-2 m3-label-md text-white/70 uppercase tracking-widest">
            <span>Home</span>
            <span className="opacity-50">/</span>
            <span className="text-white font-medium">About RLA</span>
          </div>
        </div>
      </section>

      {/* ── Main Content Container ── */}
      <article className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-32">
        
        {/* 1. About Us Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-primary"></span>
              <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">OBSERVATORY</span>
            </div>
            <h2 className="font-headline-lg text-4xl sm:text-5xl text-on-surface tracking-tight">
              About Us
            </h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Red Lantern Analytica is an international affairs observer group based out of New Delhi, India, researching about notable international relations issues. We indulge in driving discussions over critical issues and opportunities related to geopolitics.
            </p>
          </div>
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl ring-1 ring-outline/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://redlanternanalytica.com/wp-content/uploads/elementor/thumbs/us-rngirqu3z8cnmy1n0wx3br7sq2alsipkmv4qmvh3jg.jpg" 
              alt="Hands stacked in unity"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </section>

        {/* 2. Our Mission Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl ring-1 ring-outline/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://redlanternanalytica.com/wp-content/uploads/2026/05/mi-1024x683.jpg" 
              alt="Mission Analysis"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="font-headline-lg text-4xl sm:text-5xl text-on-surface tracking-tight">
              Our Mission
            </h2>
            <ul className="space-y-6">
              {[
                { letter: 'R', title: 'Research', desc: 'Generating credible, insightful, and Analytical research.' },
                { letter: 'L', title: 'Leadership', desc: 'Leading the discussions on International Relations and Geopolitics of the world.' },
                { letter: 'A', title: 'Analytical', desc: 'Demonstrating strong analytical skills to deeply analyse complex issues and provide feasible solutions.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline/10 hover:border-primary/30 transition-colors shadow-sm">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-display-hero text-2xl">
                    {item.letter}
                  </div>
                  <div>
                    <h3 className="font-title-lg text-on-surface mb-1">{item.title}</h3>
                    <p className="font-body-md text-on-surface-variant leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. Our Vision Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8">
            <h2 className="font-headline-lg text-4xl sm:text-5xl text-on-surface tracking-tight">
              Our Vision
            </h2>
            <ul className="space-y-5">
              {[
                "To set up a globally recognized research organisation that banks on high-end research and studies to better understand global affairs and represent a just viewpoint globally.",
                "To engage with democratic forces in an efforts to pushback against non-democratic, authoritarian regimes.",
                "To collaborate with like-minded individuals and institutions to lead discussions on geopolitical developments"
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <span className="material-symbols-outlined text-primary text-[24px]">check_circle</span>
                  </div>
                  <p className="font-body-lg text-on-surface-variant leading-relaxed">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-xl ring-1 ring-outline/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://redlanternanalytica.com/wp-content/uploads/elementor/thumbs/vi-rngi86szsbkw30ga7yliy6vjsgoon82ma2i26mgyzw.jpg" 
              alt="Vision Forward"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </section>

      </article>

      <Footer />
    </main>
  );
}
