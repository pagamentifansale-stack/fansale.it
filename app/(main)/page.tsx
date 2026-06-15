import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrendingEvents from "@/components/home/TrendingEvents";
import RecentListings from "@/components/home/RecentListings";

export default function MainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrendingEvents />
        <RecentListings />
      </main>
      <Footer />
    </div>
  );
}
