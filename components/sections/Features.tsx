import { Card, CardContent } from "@/components/ui/card";
import { siteData } from "@/lib/data/site-data";
import { Star, Zap, Shield } from "lucide-react";

// ====================
// Features Section Component
// قسم المميزات (اختياري - يعتمد على Feature Flag)
// ====================

export default function Features() {
  const { features, featuresList, featuresSectionTitle, featuresSectionSubtitle } = siteData;

  // إذا كان Feature Flag معطل، لا نعرض هذا القسم
  if (!features.showFeaturesSection) {
    return null;
  }

  // إذا لم توجد عناصر فعّالة (عنوان أو قائمة مميزات)، لا نعرض شيئاً لتجنب الفراغ
  if (!featuresSectionTitle && !featuresSectionSubtitle && featuresList.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-custom">
        {(featuresSectionTitle || featuresSectionSubtitle) && (
          <div className="text-center mb-10">
            {featuresSectionTitle && (
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark)] mb-4">
                {featuresSectionTitle}
              </h2>
            )}
            {featuresSectionSubtitle && (
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {featuresSectionSubtitle}
              </p>
            )}
          </div>
        )}
        {featuresList.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuresList.map((feature, index) => {
              const iconName = (feature.icon || "").toLowerCase();
              const IconComponent = iconName === "star" ? Star : iconName === "zap" ? Zap : iconName === "shield" ? Shield : Star;
              return (
                <Card key={index} className="border transition-all duration-300 hover:shadow-sm">
                  <CardContent className="pt-6">
                    {feature.icon && (
                      <div className="mb-4">
                        <IconComponent className="w-8 h-8 text-black" aria-hidden="true" />
                      </div>
                    )}
                    {feature.title && (
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    )}
                    {feature.description && (
                      <p className="text-sm leading-relaxed">{feature.description}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
