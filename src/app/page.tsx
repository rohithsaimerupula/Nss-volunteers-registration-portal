import Background3D from "@/components/3d/Background3D";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Background3D />
      <Navbar />
      
      <div className="flex-grow">
        <Hero />
        
        {/* Placeholder for other sections */}
        <section id="about" className="min-h-screen bg-white relative z-10 py-20 px-4 md:px-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-black text-nss-dark mb-8">NATIONAL SERVICE SCHEME</h2>
            <p className="text-lg md:text-xl text-nss-muted leading-relaxed">
              The National Service Scheme (NSS) provides students with opportunities to participate in community-oriented activities and develop a spirit of service, responsibility, leadership and social awareness.
            </p>
          </div>
        </section>
      </div>
      
      <footer className="bg-nss-dark text-white py-12 relative z-10 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-2">NATIONAL SERVICE SCHEME</h3>
          <p className="text-gray-400 mb-6">Vignan's Institute of Information Technology</p>
          <p className="text-lg font-semibold text-nss-accent mb-8">NOT ME, BUT YOU</p>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} NSS &mdash; Vignan's Institute of Information Technology
          </div>
        </div>
      </footer>
    </main>
  );
}
