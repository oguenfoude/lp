import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import OrderForm from "@/components/sections/OrderForm";
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
        {/* Features Section - يظهر فقط إذا فعّلت عبر المتغيرات */}
        {/* <Features /> */}
        {/* Order Form - نموذج الطلب */}
        <OrderForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

