import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import OrderForm from "@/components/sections/OrderForm";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <OrderForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

