import Footer from "@/components/Footer";

const TEAM = [
  {
    name: "Dr. Ayanjit Sen",
    title: "Chief Advisor",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/31.png"
  },
  {
    name: "Dr. Siddhartha Ghosh",
    title: "Director",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/32.png"
  },
  {
    name: "Ujjual Abhishek Jha",
    title: "Strategic Advisor and Chief Geopolitical Analyst",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/02/uu-removebg-preview-1.png"
  },
  {
    name: "Dr. Abhishek Ranjan",
    title: "Director",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/30.png"
  },
  {
    name: "Vanchinathan Y",
    title: "Head (Network & Outreach)",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/28.png"
  },
  {
    name: "Daney Antonio Martin",
    title: "Senior Research Associate",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/29.png"
  },
  {
    name: "Archa K G",
    title: "Research Assistant",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/27.png"
  },
  {
    name: "Poulina Banerjee",
    title: "Research Assistant",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/26.png"
  },
  {
    name: "Mishti Sinha",
    title: "Research Assistant",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/25.png"
  },
  {
    name: "Manjyot Kaur",
    title: "Research Assistant",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/24.png"
  },
  {
    name: "Nripan Babu",
    title: "Research Assistant",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/23.png"
  },
  {
    name: "Shashank Gupta",
    title: "Operations Manager",
    img: "https://redlanternanalytica.com/wp-content/uploads/2025/08/22.png"
  }
];

export default function TeamPage() {
  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[35vh] min-h-[300px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-low" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">OBSERVATORY STAFF</span>
          </div>
          <h1 className="font-display-hero text-[42px] sm:text-[56px] text-on-surface tracking-tight mb-2">
            Our Team
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mt-4">
            The strategic analysts, researchers, and operations staff powering Red Lantern Analytica's global intelligence capabilities.
          </p>
        </div>
      </section>

      {/* ── Team Grid ── */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col items-center text-center bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline/10 hover:border-transparent"
            >
              {/* Red Hover Background */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              
              <div className="relative z-10 p-6 w-full h-full flex flex-col items-center">
                <div className="w-28 h-28 mb-5 rounded-full overflow-hidden border-4 border-surface-container-lowest group-hover:border-white transition-colors duration-500 shadow-md bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={member.img} 
                    alt={member.name}
                    className="w-full h-full object-cover object-top filter group-hover:brightness-110 transition-all duration-500"
                  />
                </div>
                <h3 className="font-title-lg text-on-surface group-hover:text-white transition-colors duration-500 mb-1 leading-tight">
                  {member.name}
                </h3>
                <p className="font-body-sm text-on-surface-variant group-hover:text-white/90 transition-colors duration-500">
                  {member.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
