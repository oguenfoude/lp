import { cong, congSocials } from "@/lib/config/cong";
import Image from "next/image";

export default function Footer() {
  const { footer, site } = cong;
  // Force local logo if remote placeholder domain used but not desired
  const logoEnv = process.env.NEXT_PUBLIC_LOGO_IMAGE;
  const logoSrc = logoEnv && !/placehold\.co/.test(logoEnv) ? logoEnv : "/images/logo/logo.png";
  // Build display list with fallback icons if congSocials empty
  const socialsToRender = congSocials.length ? congSocials : [
    {
      id: 'instagram',
      label: 'Instagram',
      url: 'https://instagram.com/',
      svg: { viewBox: '0 0 24 24', path: 'M12 2.2c3.18 0 3.56.01 4.81.07 3.03.14 4.45 1.57 4.59 4.59.06 1.25.07 1.63.07 4.81s-.01 3.56-.07 4.81c-.14 3.02-1.56 4.45-4.59 4.59-1.25.06-1.63.07-4.81.07s-3.56-.01-4.81-.07c-3.02-.14-4.45-1.57-4.59-4.59C2.21 15.65 2.2 15.27 2.2 12s.01-3.56.07-4.81c.14-3.02 1.57-4.45 4.59-4.59C8.44 2.21 8.82 2.2 12 2.2Zm0 2.05c-3.1 0-3.47.01-4.69.07-2.19.1-3.21 1.15-3.31 3.31-.06 1.22-.07 1.59-.07 4.69s.01 3.47.07 4.69c.1 2.16 1.13 3.21 3.31 3.31 1.22.06 1.59.07 4.69.07s3.47-.01 4.69-.07c2.16-.1 3.21-1.15 3.31-3.31.06-1.22.07-1.59.07-4.69s-.01-3.47-.07-4.69c-.1-2.16-1.15-3.21-3.31-3.31-1.22-.06-1.59-.07-4.69-.07Zm0 3.87a3.88 3.88 0 1 1 0 7.75 3.88 3.88 0 0 1 0-7.75Zm0 6.35a2.47 2.47 0 1 0 0-4.94 2.47 2.47 0 0 0 0 4.94Zm4.95-7.92a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z', fill: 'url(#igGradient)', gradient: { id: 'igGradient', stops: [ { offset: '0%', color: '#FEDA75' }, { offset: '25%', color: '#FA7E1E' }, { offset: '50%', color: '#D62976' }, { offset: '75%', color: '#962FBF' }, { offset: '100%', color: '#4F5BD5' } ] } }
    },
    {
      id: 'facebook',
      label: 'Facebook',
      url: 'https://facebook.com/',
      svg: { viewBox: '0 0 24 24', path: 'M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.86v-8.4H7.08v-3.47h3.05V9.43c0-3 1.79-4.66 4.53-4.66 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.88v2.25h3.33l-.53 3.47h-2.8v8.4C19.61 23.08 24 18.09 24 12.07Z', fill: '#1877F2' }
    }
  ];
  return (
    <footer className="bg-white text-black py-10 mt-16 border-t border-[var(--color-border)]">
      <div className="container-custom flex flex-col items-center gap-5 text-center">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14">
            <Image
              src={logoSrc}
              alt={site.name}
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
          <span className="text-2xl font-bold tracking-tight">{site.name}</span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {socialsToRender.map(s => (
            <a
              key={s.id}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="group transition-transform hover:scale-110"
            >
              <svg className="w-7 h-7" viewBox={s.svg.viewBox} role="img" aria-hidden="true">
                {s.svg.gradient && (
                  <defs>
                    <linearGradient id={s.svg.gradient.id} x1="0%" y1="0%" x2="100%" y2="100%">
                      {s.svg.gradient.stops.map(st => (
                        <stop key={st.offset} offset={st.offset} stopColor={st.color} />
                      ))}
                    </linearGradient>
                  </defs>
                )}
                <path fill={s.svg.fill} d={s.svg.path} />
              </svg>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-xs text-[var(--color-muted)] leading-relaxed max-w-md">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
