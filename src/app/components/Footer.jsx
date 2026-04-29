"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// --- REUSABLE GLASS MODAL COMPONENT ---
const GlassModal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1B5E20]/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden bg-white/90 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-[#1B5E20]/5 flex justify-between items-center bg-white/40">
              <h2 className="text-xl font-serif font-bold text-[#113B14]">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar text-[#2C3B2E] text-sm leading-relaxed">
              {children}
            </div>
            <div className="p-4 bg-white/40 border-t border-[#1B5E20]/5 text-center">
              <button
                onClick={onClose}
                className="bg-[#1B5E20] text-white px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#113B14] transition-all"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function Footer() {
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState(null); // 'terms' or 'privacy'

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/product/list`);
        const data = await res.json();
        if (data.products) {
          const uniqueCategories = [
            ...new Set(data.products.map((p) => p.category)),
          ].filter(Boolean);
          setCategories(uniqueCategories.slice(0, 5));
        }
      } catch (err) {
        console.error("Footer category fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="bg-[#1B5E20] text-white pt-16 pb-8 relative z-10">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shadow-inner">
                🌿
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold tracking-tight">
                  Haridas Ayurveda
                </h3>
                <p className="text-[10px] text-[#A3D9A3] tracking-[0.3em] uppercase">
                  Estd 1998
                </p>
              </div>
            </div>
            <p className="text-[#A3D9A3] text-sm leading-relaxed max-w-xs font-light">
              Rooted in ancient Vedic wisdom, we bring you pure, ritual-based
              healing for the modern soul.
            </p>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Shop Rituals
            </h4>
            <ul className="space-y-3 text-[#A3D9A3] text-sm">
              {categories.length > 0 ? (
                categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href="/AllProducts"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-[#A3D9A3] rounded-full"></span>
                      {cat}
                    </Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link
                    href="/AllProducts"
                    className="hover:text-white transition"
                  >
                    Explore All
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Policies & Company */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Information
            </h4>
            <ul className="space-y-3 text-[#A3D9A3] text-sm">
              <li>
                <Link
                  href="/OurStory"
                  className="hover:text-white transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/Contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setModalType("terms")}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms and Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => setModalType("privacy")}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">
              Connect
            </h4>
            <div className="space-y-4">
              <div className="group">
                <p className="text-[10px] text-[#A3D9A3] uppercase tracking-tighter mb-1">
                  Support Email
                </p>
                <a
                  href="mailto:support@haridasayurveda.com"
                  className="text-white hover:text-[#A3D9A3] transition-colors break-all text-sm font-medium underline underline-offset-4"
                >
                  support@haridasayurveda.com
                </a>
              </div>
              <div className="group">
                <p className="text-[10px] text-[#A3D9A3] uppercase tracking-tighter mb-1">
                  Direct Helpline
                </p>
                <a
                  href="tel:9896035739"
                  className="text-white hover:text-[#A3D9A3] transition-colors text-lg font-bold"
                >
                  +91 98960 35739
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-[#A3D9A3] tracking-wider uppercase font-medium">
          <p>© 2026 Haridas Ayurveda. Sacred & Pure.</p>
          <div className="flex items-center gap-2 text-white/40">
            <span>Crafted by</span>
            <span className="text-white font-bold tracking-widest">
              INBREDTECHNO
            </span>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      <GlassModal
        isOpen={modalType === "terms"}
        onClose={() => setModalType(null)}
        title="Terms & Conditions"
      >
        <div className="space-y-6 prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-[#1B5E20] prose-p:text-[#4A5D4C] prose-strong:text-[#113B14]">
          {/* Official Header */}
          <div className="bg-[#FDFBF7] p-5 rounded-[2rem] border border-[#1B5E20]/10 mb-8 shadow-sm">
            <h3 className="m-0 text-[#1B5E20] text-lg">Haridas Ayurveda LLP</h3>
            <p className="text-[11px] m-0 uppercase tracking-[0.2em] opacity-70 font-bold">
              Effective Date: 29.04.2026
            </p>
          </div>

          <p className="italic text-base">
            Welcome to Haridas Ayurveda LLP (“Company”, “we”, “our”, or “us”).
            By accessing our website (
            <a
              href="http://www.haridasayurveda.com"
              target="_blank"
              className="text-[#1B5E20] font-bold"
            >
              www.haridasayurveda.com
            </a>
            ) and purchasing our products, you agree to be bound by the
            following Terms & Conditions.
          </p>

          {/* Section Generator Wrapper */}
          <div className="space-y-8">
            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                1. Use of Website
              </h4>
              <p>
                You agree to use this website only for lawful purposes and in a
                manner that does not violate any applicable laws or regulations.
                You must not misuse this website, attempt unauthorized access,
                or engage in any activity that may harm the website or its
                users.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                2. Product Information
              </h4>
              <p>
                All products listed on our website are based on Ayurvedic
                principles and are intended for general wellness purposes.
                Product descriptions, images, and information are provided for
                informational purposes only and should not be considered medical
                advice. Results may vary from person to person.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                3. Orders & Acceptance
              </h4>
              <p>
                All orders placed through our website are subject to acceptance
                and availability. We reserve the right to cancel or refuse any
                order at our sole discretion, including in cases of pricing
                errors, suspected fraud, or stock unavailability.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                4. Pricing & Payment
              </h4>
              <p>
                All prices are listed in Indian Rupees (INR) and are
                inclusive/exclusive of applicable taxes as mentioned. Payments
                are processed through secure third-party payment gateways. We do
                not store your sensitive financial information.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                5. Shipping & Delivery
              </h4>
              <p>
                We strive to deliver products within the estimated timelines;
                however, delivery may be affected by factors beyond our control
                such as logistics delays, natural events, or regional
                restrictions. The Company shall not be liable for such delays.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                6. Returns & Refunds
              </h4>
              <p>
                Returns, refunds, or replacements shall be governed by our
                separate Refund & Return Policy available on the website.
                Certain products may not be eligible for return due to hygiene
                and safety reasons.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                7. Intellectual Property
              </h4>
              <p>
                All content on this website, including text, images, logos,
                product designs, and branding, is the property of Haridas
                Ayurveda LLP and is protected under applicable intellectual
                property laws. Unauthorized use, reproduction, or distribution
                is strictly prohibited.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                8. Limitation of Liability
              </h4>
              <p>
                To the maximum extent permitted by law, Haridas Ayurveda LLP
                shall not be liable for any indirect, incidental, or
                consequential damages arising out of the use or inability to use
                our website or products. Our liability shall be limited to the
                amount paid by the customer for the purchased product.
              </p>
            </section>

            {/* High-Attention Disclaimer Section */}
            <section className="bg-amber-50/70 p-6 rounded-[2.5rem] border border-amber-200/50 shadow-sm">
              <h4 className="text-[#856404] font-bold mt-0 flex items-center gap-2">
                <span className="text-lg">⚠️</span> 9. Disclaimer
              </h4>
              <p className="text-[#856404] m-0 leading-relaxed italic font-medium">
                Our products are not intended to diagnose, treat, cure, or
                prevent any disease. Users are advised to consult a qualified
                healthcare professional before using any Ayurvedic product,
                especially if pregnant, nursing, or under medical supervision.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                10. Third-Party Links
              </h4>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the content, policies, or practices of such
                external sites.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                11. Termination
              </h4>
              <p>
                We reserve the right to suspend or terminate access to our
                website or services at any time without prior notice if we
                believe there has been a violation of these Terms.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                12. Governing Law & Jurisdiction
              </h4>
              <p>
                These Terms & Conditions shall be governed by and construed in
                accordance with the laws of India. Any disputes shall be subject
                to the exclusive jurisdiction of the courts in Haryana, India.
              </p>
            </section>

            <section>
              <h4 className="flex items-center gap-2 text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2">
                13. Changes to Terms
              </h4>
              <p>
                We may update or modify these Terms & Conditions at any time
                without prior notice. Continued use of the website after such
                changes constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section className="pt-6 border-t border-[#1B5E20]/20">
              <h4 className="text-[#113B14] font-bold">
                14. Contact Information
              </h4>
              <div className="bg-white/50 p-6 rounded-2xl border border-white space-y-1 shadow-sm">
                <p className="font-bold text-[#1B5E20] m-0">
                  Haridas Ayurveda LLP
                </p>
                <p className="m-0">
                  <strong>Email:</strong> support@haridasayurveda.com
                </p>
                <p className="m-0">
                  <strong>Phone:</strong> 9896035739
                </p>
                <p className="m-0 text-[12px] text-gray-500 italic mt-2">
                  Registered Office of Haridas Ayurveda LLP
                </p>
              </div>
            </section>
          </div>

          <div className="text-center pt-10 text-[10px] text-gray-400 uppercase tracking-widest">
            End of Terms & Conditions
          </div>
        </div>
      </GlassModal>

      <GlassModal
        isOpen={modalType === "privacy"}
        onClose={() => setModalType(null)}
        title="Privacy Policy"
      >
        <div className="space-y-6 prose prose-sm max-w-none prose-headings:font-serif prose-headings:text-[#1B5E20] prose-p:text-[#4A5D4C] prose-strong:text-[#113B14]">
          {/* Policy Branding Header */}
          <div className="bg-[#FDFBF7] p-5 rounded-[2rem] border border-[#1B5E20]/10 mb-8 shadow-sm">
            <h3 className="m-0 text-[#1B5E20] text-lg">Haridas Ayurveda LLP</h3>
            <p className="text-[11px] m-0 uppercase tracking-[0.2em] opacity-70 font-bold">
              Effective Date: 29.04.2026
            </p>
          </div>

          <p className="italic leading-relaxed">
            Haridas Ayurveda LLP (“Haridas Ayurveda”, “Company”, “we”, “our”, or
            “us”) respects your privacy and is committed to protecting your
            personal data in accordance with applicable laws, including the
            **Information Technology Act, 2000** and the **Digital Personal Data
            Protection Act, 2023**.
          </p>

          <div className="space-y-8">
            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                1. Data Collection
              </h4>
              <p>
                We may collect personal data that you voluntarily provide to us,
                including your name, mobile number, email address, billing and
                shipping address, and order details. We may also automatically
                collect certain technical and usage information such as IP
                address, browser type, device identifiers, and interaction data
                through cookies.
                <strong>
                  {" "}
                  Payment-related information is processed through secure
                  third-party gateways; we do not store sensitive financial
                  data.
                </strong>
              </p>
            </section>

            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                2. Purpose of Processing
              </h4>
              <p>
                Your personal data is processed for lawful purposes including
                order processing, logistics and delivery, customer support,
                improving our services, fraud prevention, and legal compliance.
                With your consent, we may send promotional communications, which
                you may opt out of at any time.
              </p>
            </section>

            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                3. Data Sharing & Disclosure
              </h4>
              <p>
                We do not sell or rent your personal data. We may disclose
                information to trusted third parties strictly on a need-to-know
                basis, such as logistics partners and payment processors. All
                such parties are contractually obligated to maintain
                confidentiality and adhere to data protection standards.
              </p>
            </section>

            <section className="bg-[#1B5E20]/5 p-6 rounded-[2.5rem] border border-[#1B5E20]/10">
              <h4 className="text-[#1B5E20] font-bold mt-0 flex items-center gap-2">
                <span className="text-lg">🛡️</span> 4. Security Measures
              </h4>
              <p className="m-0 text-[#2C3B2E]">
                We implement reasonable administrative, technical, and physical
                safeguards to protect your personal data. However, no system can
                guarantee absolute security, and you acknowledge this inherent
                risk when using our services.
              </p>
            </section>

            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                5. Data Retention
              </h4>
              <p>
                We retain your personal data only for as long as necessary to
                fulfill the purposes outlined in this Privacy Policy, comply
                with legal obligations, resolve disputes, and enforce our
                agreements, unless a longer retention period is required or
                permitted by law.
              </p>
            </section>

            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                6. Your Rights
              </h4>
              <p>
                You have certain rights under applicable laws, including the
                right to access, correct, update, or request deletion of your
                personal data, withdraw consent, and opt out of marketing
                communications. You may exercise these rights by contacting us
                using the details provided below. We will respond to such
                requests in accordance with applicable legal requirements.
              </p>
            </section>

            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                7. Cookies & Minors
              </h4>
              <p>
                Our website uses cookies and similar technologies to enhance
                user experience, analyze traffic, and improve functionality. You
                may manage or disable cookies through your browser settings;
                however, doing so may affect certain features of the website.
              </p>
            </section>
            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                8. Third Party Sites
              </h4>
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of such
                external sites, and users are encouraged to review their
                respective privacy policies.
              </p>
            </section>
            <section>
              <h4 className="text-[#113B14] font-bold border-b border-[#1B5E20]/5 pb-2 uppercase tracking-wider text-[11px]">
                9. Policy
              </h4>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in legal, regulatory, or operational requirements. The
                updated version will be posted on this page with a revised
                effective date, and continued use of our services shall
                constitute your acceptance of such changes.
              </p>
            </section>
            <section className="pt-6 border-t border-[#1B5E20]/20">
              <h4 className="text-[#113B14] font-bold">
                Grievance Officer (Indian Law)
              </h4>
              <div className="bg-white/50 p-6 rounded-2xl border border-white space-y-1 shadow-sm mt-4">
                <p className="font-bold text-[#1B5E20] m-0">
                  Haridas Ayurveda LLP
                </p>
                <p className="m-0 text-sm italic underline underline-offset-4">
                  support@haridasayurveda.com
                </p>
                <p className="m-0 text-sm font-medium">Phone: 9896035739</p>
                <p className="m-0 text-[12px] text-gray-500 mt-2">
                  Registered Office of Haridas Ayurveda LLP
                </p>
              </div>
            </section>
          </div>

          <div className="text-center pt-10 text-[10px] text-gray-400 uppercase tracking-widest">
            End of Privacy Policy
          </div>
        </div>
      </GlassModal>
    </footer>
  );
}
