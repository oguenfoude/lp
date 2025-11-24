import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Gallery from "@/components/sections/Gallery";
import OrderForm from "@/components/sections/OrderForm";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

// ====================
// Main Landing Page
// الصفحة الرئيسية - تجميع كل الأقسام
// ====================

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header - ثابت في الأعلى */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section - القسم الرئيسي */}
        <Hero />
        <Gallery />
        <OrderForm />
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

