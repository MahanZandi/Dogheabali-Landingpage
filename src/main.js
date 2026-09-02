import './main.css';
import EmblaCarousel from 'embla-carousel';

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
  });
}

// Sliding Nav Underline
const navLinks = document.getElementById('nav-links');
const indicator = document.getElementById('nav-indicator');
const links = navLinks?.querySelectorAll('.nav-link');

if (links && indicator) {
  links.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      const rect = link.getBoundingClientRect();
      const parentRect = navLinks.getBoundingClientRect();
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.width = `${rect.width}px`;
    });
  });

  // Hide on leave
  navLinks.addEventListener('mouseleave', () => {
    indicator.style.width = '0px';
  });
}

// Dogh Shake + Animation Sequence
const doghMain = document.getElementById('dogh-main');
const doghFrame2Wrapper = document.getElementById('dogh-frame-2-wrapper');
const doghSteam = document.getElementById('dogh-steam');
const doghFrame3 = document.getElementById('dogh-frame-3');
const capSound = new Audio('/audio/zapsplat_food_drink_soda_bottle_glass_metal_lid_twist_open_fizz.mp3');

if (doghMain) {
  doghMain.addEventListener('click', () => {
    if (doghMain.classList.contains('shaking')) return;

    doghMain.classList.add('shaking');

    // After ~1.5s of shaking, switch to frame-2 with steam + cap launches
    setTimeout(() => {
      doghMain.classList.remove('shaking');
      doghMain.classList.add('hidden');
      doghFrame2Wrapper.classList.remove('hidden');
      doghSteam.classList.remove('hidden');
      doghSteam.classList.add('steaming');
      doghFrame3.classList.remove('hidden');
      doghFrame3.classList.add('launching');
      capSound.currentTime = 0;
      capSound.play().catch(() => {});

      // Hide frame-3 and steam after animation
      setTimeout(() => {
        doghFrame3.classList.remove('launching');
        doghFrame3.classList.add('hidden');
        doghSteam.classList.remove('steaming');
        doghSteam.classList.add('hidden');
      }, 900);
    }, 1500);
  });
}

// ── Custom Vertical Slider (sticky, 60vh per slide) ──
const slider = {
  wrapper: document.getElementById('features-slider-wrapper'),
  container: document.getElementById('features-slider'),
  track: document.getElementById('slides-track'),
  images: document.querySelectorAll('.slide-image'),
  title: document.getElementById('slide-title'),
  desc: document.getElementById('slide-desc'),
  indicators: document.querySelectorAll('.slider-indicator'),
  current: 0,
  vhPerSlide: 0.6,
  data: [
    {
      tag: 'ویژگی های دوغ آبعلی',
      title: 'اصیل ترین نوشیدنی ایرانی',
      desc: '70 کیلو کالری ، 3.5 گرم پروتئین ، 7.6 گرم کربوهیدرات ، 3 گرم چربی',
    },
    {
      tag: 'طعم واقعی',
      title: 'با عصاره نعنای تازه',
      desc: 'ترکیبی از دوغ طبیعی و نعنای تازه کوهستانی، بدون هیچ افزودنی شیمیایی',
    },
    {
      tag: 'بسته بندی متنوع',
      title: 'برای هر لحظه',
      desc: 'در بسته های ۳۳۰ میلی لیتری، ۱.۵ لیتری خانواده و ۵ لیتری مهمانی',
    },
  ],
};

function updateSlider(target) {
  if (target === slider.current || !slider.container) return;
  const prev = slider.current;
  const next = target;
  slider.images.forEach((img) => {
    const idx = Number(img.dataset.index);
    img.classList.remove('image-slide-up');
    if (idx === prev) {
      img.style.transform = 'translateY(-100%)';
      img.style.opacity = '0';
      img.style.pointerEvents = 'none';
    } else if (idx === next) {
      img.style.transform = 'translateY(0)';
      img.style.opacity = '1';
      img.style.pointerEvents = 'auto';
      void img.offsetWidth;
      img.classList.add('image-slide-up');
    } else {
      img.style.transform = 'translateY(100%)';
      img.style.opacity = '0';
      img.style.pointerEvents = 'none';
    }
  });
  [slider.title, slider.desc].forEach((el) => {
    el.classList.remove('text-focus-in');
    void el.offsetWidth;
    el.classList.add('text-blur-out');
  });
  setTimeout(() => {
    slider.title.textContent = slider.data[next].title;
    slider.desc.textContent = slider.data[next].desc;
    [slider.title, slider.desc].forEach((el) => {
      el.classList.remove('text-blur-out');
      void el.offsetWidth;
      el.classList.add('text-focus-in');
    });
  }, 360);
  slider.indicators.forEach((ind, idx) => {
    const active = idx === next;
    ind.classList.toggle('bg-abali-darya', active);
    ind.classList.toggle('bg-abali-darya/25', !active);
    ind.style.height = active ? '76px' : '40px';
  });
  slider.current = next;
}

let isProgrammaticScroll = false;
let programmaticTimer = null;

function onSliderScroll() {
  if (!slider.wrapper || isProgrammaticScroll) return;
  const rect = slider.wrapper.getBoundingClientRect();
  const vh = window.innerHeight;
  const scrolled = -rect.top;
  if (scrolled < 0) {
    if (slider.current !== 0) updateSlider(0);
    return;
  }
  const idx = Math.min(slider.data.length - 1, Math.floor(scrolled / (vh * slider.vhPerSlide)));
  if (idx !== slider.current) updateSlider(idx);
}

window.addEventListener('scroll', onSliderScroll, { passive: true });
onSliderScroll();

slider.indicators.forEach((ind) => {
  ind.addEventListener('click', () => {
    const target = Number(ind.dataset.slide);
    if (target === slider.current || !slider.wrapper) return;
    isProgrammaticScroll = true;
    clearTimeout(programmaticTimer);
    updateSlider(target);
    const vh = window.innerHeight;
    const wrapperTop = slider.wrapper.offsetTop;
    const wrapperHeight = slider.wrapper.offsetHeight;
    const targetY = target === slider.data.length - 1 ? wrapperTop + wrapperHeight - vh : wrapperTop + target * vh * slider.vhPerSlide;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    programmaticTimer = setTimeout(() => {
      isProgrammaticScroll = false;
      onSliderScroll();
    }, 800);
  });
});

window.addEventListener('wheel', () => {
  if (isProgrammaticScroll) {
    clearTimeout(programmaticTimer);
    isProgrammaticScroll = false;
  }
}, { passive: true });

// ── Video Embla (h 636px, rounded 73px, dir ltr isolated) ──
const emblaVideoNode = document.querySelector('.embla-video');
const emblaVideo = emblaVideoNode
  ? EmblaCarousel(emblaVideoNode, {
      axis: 'x',
      direction: emblaVideoNode.getAttribute('dir') || 'ltr',
      loop: false,
      align: 'start',
      containScroll: 'trimSnaps',
    })
  : null;

const videoDots = document.querySelectorAll('.video-dot');
function syncVideoDots(idx) {
  videoDots.forEach((dot, i) => {
    const active = i === idx;
    dot.className = active ? 'video-dot w-8 h-1.5 rounded-full bg-abali-darya' : 'video-dot size-1.5 rounded-full bg-abali-darya/40';
  });
}
if (emblaVideo) {
  emblaVideo.on('select', () => syncVideoDots(emblaVideo.selectedScrollSnap()));
  syncVideoDots(0);
}
videoDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    const idx = Number(dot.dataset.dot);
    emblaVideo?.scrollTo(idx);
  });
});

// click play → show iframe inside current slide
document.querySelectorAll('.embla-video .embla__slide').forEach((slide) => {
  const poster = slide.querySelector('.video-poster');
  const frame = slide.querySelector('.video-frame');
  const play = slide.querySelector('.video-play');
  const open = () => {
    poster?.classList.add('hidden');
    frame?.classList.remove('hidden');
  };
  play?.addEventListener('click', (e) => { e.stopPropagation(); open(); });
  poster?.addEventListener('click', open);
});

// Capture frame at 24s for each thumb (fallback keeps aparat poster)
document.querySelectorAll('.video-thumb').forEach((thumb) => {
  const tv = document.createElement('video');
  tv.crossOrigin = 'anonymous';
  tv.muted = true;
  tv.playsInline = true;
  tv.preload = 'metadata';
  tv.src = 'https://caspian1.cdn.asset.aparat.com/aparat-video/b6832697d990bfcab8d22bb30692421f45926402-360p.mp4';
  tv.addEventListener('loadedmetadata', () => { tv.currentTime = Math.min(24, tv.duration - 0.1); });
  tv.addEventListener('seeked', () => {
    try {
      const c = document.createElement('canvas');
      c.width = tv.videoWidth; c.height = tv.videoHeight;
      c.getContext('2d').drawImage(tv, 0, 0, c.width, c.height);
      thumb.src = c.toDataURL('image/jpeg', 0.9);
      tv.remove();
    } catch { tv.remove(); }
  });
  tv.addEventListener('error', () => tv.remove());
  tv.load();
});

// ── گاز دار / بدون گاز tabs (165x62, #4383C4 / #DDE7F0) ──
const gazTabs = document.querySelectorAll('.gaz-tab');
const gazdarProducts = document.getElementById('gazdar-products');
const bedoonProducts = document.getElementById('bedoon-products');

gazTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.gazTab;
    const isGazdar = target === 'gazdar';

    gazTabs.forEach((t) => {
      const active = t.dataset.gazTab === target;
      t.classList.toggle('bg-[#4383C4]', active);
      t.classList.toggle('text-white', active);
      t.classList.toggle('bg-[#DDE7F0]', !active);
      t.classList.toggle('text-[#4383C4]', !active);
    });

    gazdarProducts?.classList.toggle('hidden', !isGazdar);
    gazdarProducts?.classList.toggle('flex', isGazdar);
    bedoonProducts?.classList.toggle('hidden', isGazdar);
    bedoonProducts?.classList.toggle('flex', !isGazdar);
  });
});
