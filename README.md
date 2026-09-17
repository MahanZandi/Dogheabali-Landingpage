# Dogheabali Landing Page

A fully responsive, RTL Persian (Farsi) landing page for **Doogh Abali** — a concept redesign presenting Iran's most authentic traditional drink. Built with a focus on scroll-driven storytelling, precise mobile breakpoints, and SEO.

![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![Embla Carousel](https://img.shields.io/badge/Embla_Carousel-8-555555)
![RTL](https://img.shields.io/badge/RTL-Persian-faNum-4383C4)

Repository: [MahanZandi/Dogheabali-Landingpage](https://github.com/MahanZandi/Dogheabali-Landingpage)

## Highlights

- **Animated hero** — glowing halos, floating product bottles, and an interactive "shake the doogh" bottle animation with steam, cap-launch, and sound effects.
- **Sticky scroll-driven features slider** — pins the viewport (`220vh` scroll track, `60vh` per slide) with crossfading imagery and blur-in text transitions.
- **Product catalog with tabs** — Gazdar / Bedoon-gaz tabs; static grid on desktop, autoplaying center-focus Embla slider with ping-pong looping on mobile.
- **Testimonials synced with a live map** — vertical Embla slider with official Autoplay plugin; each slide lights up its region and avatar pin on the Iran map.
- **Video slider** — Embla-powered video carousel with dot navigation and click-to-play posters.
- **Animated stats** — Persian-digit count-up triggered once on viewport entry.
- **Custom footer** — product bottle with soft shadow, masked background pattern, developer contact, and social links.
- **Mobile-first responsive** — dedicated breakpoints down to 375px/360px widths (single-line headings, side-by-side CTAs, minimal comment cards).

## Tech Stack

| Layer | Choice |
|---|---|
| Build | Vite 8 |
| Styling | Tailwind CSS 3 + custom CSS animations |
| Sliders | Embla Carousel 8 + `embla-carousel-autoplay` |
| Fonts | Bonyad Koodak (VF) + Bonyad Koodak FaNum for Persian digits |
| Language | HTML, vanilla JS (ES modules), RTL layout |

## Getting Started

```bash
# install dependencies
npm install

# start dev server
npm run dev

# production build
npm run build

# preview production build
npm run preview
```

## Project Structure

```
├── index.html          # landing page markup (RTL, SEO meta + JSON-LD)
├── 404.html            # custom not-found page
├── src/
│   ├── main.js         # hamburger menu, sliders, tabs, autoplay, stats, map sync
│   └── main.css        # fonts, keyframes (shake, steam, cap launch), Embla overrides
├── images/             # product artwork, map, icons, footer mask
├── fonts/              # Bonyad Koodak variable + static weights
└── audio/              # bottle-cap sound effect
```

## SEO

- Descriptive Persian `<title>`, meta description, and keyword set (`دوغ آبعلی`, `دوغ گازدار`, `نوشیدنی ایرانی`, …).
- Open Graph + Twitter Card tags with the product shot as `og:image` (676×582 PNG).
- Semantic heading hierarchy (single `h1`) and `fa_IR` locale.
- JSON-LD `Product` structured data for rich results.

> Note: `og:image` currently points at the raw GitHub asset. After deploying, switch it to the production domain URL.

## Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| Desktop | Full layout, `82px` section gaps, `588px`-scale artwork |
| `lg` | Compact nav, scaled bottles |
| `sm` (640px) | Stacked layouts, side-by-side CTAs, `280px` comment cards |
| `420px` / `375px` | Single-line headings, minimal badges and pins |

## Author

**Mahan Zandi** — Front-End Developer

- Website: [mahanzandi.ir/fa](https://mahanzandi.ir/fa)
- Telegram: [@zandidev](https://t.me/zandidev)
- LinkedIn: [mahanzandi](https://www.linkedin.com/in/mahanzandi/)
- GitHub: [MahanZandi](https://github.com/MahanZandi)
- Phone: [+98 939 552 6996](tel:+989395526996)

## License

Concept project — free to explore. The design is a fictional concept and all rights are reserved by no one.
