import { cong } from "@/lib/config/cong";
import { Phone, Mail, Instagram, Facebook } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const { footer, site } = cong;

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 text-gray-900 py-16 mt-20 border-t border-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src="/images/logo/logo.png"
                  alt={site.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{site.name}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {site.description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold text-gray-900">تواصل معنا</h4>
            <div className="space-y-3">
              <a
                href={`tel:${footer.phone}`}
                className="flex items-center justify-center gap-2 text-gray-700 hover:text-black transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm">{footer.phone}</span>
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="flex items-center justify-center gap-2 text-gray-700 hover:text-black transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="text-sm">{footer.email}</span>
              </a>
            </div>
          </div>

          {/* Social Section */}
          <div className="space-y-4 text-center md:text-left">
            <h4 className="text-lg font-semibold text-gray-900">تابعنا</h4>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {footer.instagram && (
                <a
                  href={footer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Instagram className="w-5 h-5 text-white" strokeWidth={2} />
                </a>
              )}
              {footer.facebook && (
                <a
                  href={footer.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                >
                  <Facebook className="w-5 h-5 text-white" strokeWidth={2} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-300 text-center">
          <p className="text-sm text-gray-600">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
