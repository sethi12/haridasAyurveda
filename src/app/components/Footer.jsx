import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1B5E20] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-2xl">
                🌿
              </div>
              <div>
                <h3 className="font-serif text-2xl font-semibold">Haridas Ayurveda</h3>
                <p className="text-xs text-[#A3D9A3] tracking-widest">ESTD 1998</p>
              </div>
            </div>
            
            <p className="text-[#A3D9A3] leading-relaxed max-w-xs">
              Pure. Natural. Healing.<br />
              Rooted in ancient wisdom, crafted with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-5 text-white">Shop</h4>
            <ul className="space-y-3 text-[#A3D9A3]">
              <li><Link href="#" className="hover:text-white transition">Herbal Powders</Link></li>
              <li><Link href="#" className="hover:text-white transition">Face & Skin Care</Link></li>
              <li><Link href="#" className="hover:text-white transition">Hair Care</Link></li>
              <li><Link href="#" className="hover:text-white transition">Massage Oils</Link></li>
              <li><Link href="#" className="hover:text-white transition">Wellness Kits</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-medium mb-5 text-white">Company</h4>
            <ul className="space-y-3 text-[#A3D9A3]">
              <li><Link href="#" className="hover:text-white transition">Our Story</Link></li>
              <li><Link href="#" className="hover:text-white transition">Our Philosophy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-lg font-medium mb-5 text-white">Support</h4>
            <ul className="space-y-3 text-[#A3D9A3]">
              <li><Link href="#" className="hover:text-white transition">Track Order</Link></li>
              <li><Link href="#" className="hover:text-white transition">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Returns</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
            </ul>

            <div className="mt-8">
              <p className="text-sm text-[#A3D9A3]">Have questions?</p>
              <a href="tel:9894035739" className="text-white hover:text-[#A3D9A3] transition text-lg font-medium">
                +91 98940 35739
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#2E7D32] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#A3D9A3]">
          <p>© 2026 Haridas Ayurveda. All Rights Reserved.</p>
          
          <p className="text-center md:text-right">
            Developed & Managed with ❤️ by{" "}
            <span className="font-medium text-white">InbredTechno</span> • 
            {/* <a href="tel:9894035739" className="hover:text-white ml-1">
              98940 35739
            </a> */}
          </p>

          <div className="flex gap-6 text-xs">
            <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}