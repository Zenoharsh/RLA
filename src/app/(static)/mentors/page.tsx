import Footer from "@/components/Footer";

const MENTORS = [
  {
    name: "Sujeet Kumar",
    title: "Member of Parliament Rajya Sabha (Odisha)",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Picture1_180x180.jpg"
  },
  {
    name: "Shri. Ninong Ering",
    title: "Member of Legislative Assembly, Arunachal Pradesh",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/ninong-1.png"
  },
  {
    name: "Aric Chen",
    title: "Senior Editor, Anchor, and Producer, Epoch Times",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Aric-Chen-2.jpg"
  },
  {
    name: "Maj. General (Retd) Ashok Kumar",
    title: "Kargil War Veteran & Director General, CENJOWS",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Maj.-General-Retd-Ashok-Kumar_171x171.jpg"
  },
  {
    name: "Lieutenant General Vinod G. Khandare",
    title: "PVSM, AVSM, SM, Former Principal Advisor, Ministry of Defence",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Lt.-Gen.-Vinod-G.-Khandare_155x155.jpg"
  },
  {
    name: "Vahram Ayvazyan",
    title: "Founder of Network State",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Vahram-Ayvazyan_153x153.jpg"
  },
  {
    name: "Paul Antonopoulos",
    title: "Bureau Chief, Greek City Times",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Paul-Antonopoulos_155x155.jpg"
  },
  {
    name: "Anush Ghavalyan",
    title: "Stepanakert-based journalist. Host of Artsakh TV's Today's Topic Program",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Anush-Ghavalyan.jpg"
  },
  {
    name: "Mr. Jevlan Shirmemmet",
    title: "Uyghur Activist, Chinese living in exile in Turkey",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Jevlan-Shirmemmet_160x160.jpg"
  },
  {
    name: "Dr. Jagannath Panda",
    title: "Head, Stockholm Center for South Asian and Indo-Pacific Affairs",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Dr.-Jagannath-Panda-1.jpg"
  },
  {
    name: "Dr. Amar Patnaik",
    title: "Former Member of Parliament (Odisha)",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Picture11_186x186.jpg"
  },
  {
    name: "Dr. John Nomikos",
    title: "Director, RIEAS, Greece",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Dr.-John-Nomikos-2.jpg"
  },
  {
    name: "Air Commodore S P Singh",
    title: "Senior Fellow Centre for Aerospace Power & Strategic Studies",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Air-Commodore-S-P-Singh_328x328.jpg"
  },
  {
    name: "Mr. Ilshat H. Kokbore",
    title: "Research Director Center for Uyghur Studies",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Mr.-Ilshat-H.-Kokbore_138x138.jpg"
  },
  {
    name: "Mr. Massoud Hossaini",
    title: "Photojournalist, Agence France-Presse & Pulitzer Prize Winner, Human Rights Activist",
    img: "https://redlanternanalytica.com/wp-content/uploads/2026/08/Mr.-Massoud-Hossaini.jpg"
  }
];

export default function MentorsPage() {
  return (
    <main className="w-full bg-background min-h-screen flex flex-col">
      {/* ── Hero Banner ── */}
      <section className="relative w-full h-[35vh] min-h-[300px] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-surface-container-low" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 mt-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-semibold">ADVISORY BOARD</span>
          </div>
          <h1 className="font-display-hero text-[42px] sm:text-[56px] text-on-surface tracking-tight mb-2">
            Our Mentors
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mt-4">
            Guiding the strategic vision and analytical integrity of Red Lantern Analytica through decades of geopolitical, military, and diplomatic expertise.
          </p>
        </div>
      </section>

      {/* ── Mentors Grid ── */}
      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENTORS.map((mentor, idx) => (
            <div 
              key={idx}
              className="group relative flex flex-col items-center text-center bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline/10 hover:border-transparent"
            >
              {/* Red Hover Background */}
              <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
              
              <div className="relative z-10 p-8 w-full h-full flex flex-col items-center">
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-surface-container-lowest group-hover:border-white transition-colors duration-500 shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={mentor.img} 
                    alt={mentor.name}
                    className="w-full h-full object-cover object-top filter group-hover:brightness-110 transition-all duration-500"
                  />
                </div>
                <h3 className="font-headline-sm text-[22px] text-on-surface group-hover:text-white transition-colors duration-500 mb-2 leading-tight">
                  {mentor.name}
                </h3>
                <p className="font-body-sm text-on-surface-variant group-hover:text-white/90 transition-colors duration-500 max-w-[250px]">
                  {mentor.title}
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
