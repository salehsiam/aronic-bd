import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white/70">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-0">
        <div className="grid grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2">
            <h3 className="font-display text-white text-xl mb-3">
              Dept. of Forensic Medicine & Toxicology
            </h3>
            <p className="text-sm leading-relaxed">
              Mymensingh Medical College, Bangladesh. Dedicated to forensic science education,
              medico-legal services, and academic excellence.
            </p>
            <p className="font-bn text-green-300 text-sm mt-3">ময়মনসিংহ মেডিক্যাল কলেজ</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-green-300 text-xs font-bold tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            {['Home', 'About', 'Faculty', 'Notices', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="block text-sm text-white/60 hover:text-white mb-2 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-green-300 text-xs font-bold tracking-widest uppercase mb-4">
              Resources
            </h4>
            {['Research', 'Gallery', 'Appointment', 'MMC Official Site'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(' ', '-')}`}
                className="block text-sm text-white/60 hover:text-white mb-2 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {/* <div className="max-w-6xl mx-auto px-6 mt-10 py-5 border-t border-white/10 flex justify-between items-center text-xs">
        <span>© 2025 Forensic Medicine Dept., Mymensingh Medical College.</span>
        <span className="text-green-400">Designed & Developed with ❤️</span>
      </div> */}
    </footer>
  )
}
