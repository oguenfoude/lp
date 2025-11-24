"use client";
import { cong } from "@/lib/config/cong";
import { useState } from "react";

export default function FAQ() {
  const items = cong.faq;
  if (!items || items.length === 0) return null;
  return (
    <section id="faq" className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">الأسئلة الشائعة</h2>
        <div className="space-y-3">
          {items.map((item, i) => (
            <FAQItem key={i} index={i} q={item.q} a={item.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(o => !o);
  const id = `faq-panel-${index}`;
  return (
    <div className="bg-white border border-[var(--color-border)] rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="w-full text-right px-5 py-4 font-medium flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-inset"
      >
        <span className="text-base md:text-lg">{q}</span>
        <span className="text-2xl font-light flex-shrink-0 w-6 h-6 flex items-center justify-center">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div id={id} className="px-5 pb-4 text-base leading-relaxed text-[var(--color-muted)] border-t border-gray-100">
          <div className="pt-4">{a}</div>
        </div>
      )}
    </div>
  );
}