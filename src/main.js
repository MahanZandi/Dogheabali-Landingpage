import './main.css';

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
