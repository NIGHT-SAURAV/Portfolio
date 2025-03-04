// Smooth Scroll Animation for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Section Change on Mouse Scroll
let isScrolling = false;

window.addEventListener('wheel', (e) => {
  if (isScrolling) return;
  isScrolling = true;

  const sections = document.querySelectorAll('section');
  const currentSection = Array.from(sections).find((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight / 2;
  });

  let nextSection;
  if (e.deltaY > 0 && currentSection.nextElementSibling) {
    nextSection = currentSection.nextElementSibling;
  } else if (e.deltaY < 0 && currentSection.previousElementSibling) {
    nextSection = currentSection.previousElementSibling;
  }

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }

  setTimeout(() => {
    isScrolling = false;
  }, 300); // Adjust delay as needed
});

// Change section title color and nav link color when visible
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');
const lines = document.querySelectorAll('.section-indicator .line');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add active class to section title
        entry.target.classList.add('is-visible');

        // Update nav link color
        const targetId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href').includes(targetId)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Update section indicator lines
        const sectionIndex = Array.from(sections).indexOf(entry.target);
        lines.forEach((line, index) => {
          if (index === sectionIndex) {
            line.classList.add('active');
          } else {
            line.classList.remove('active');
          }
        });
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  },
  { threshold: 0.5 } // Trigger when 50% of the section is visible
);

sections.forEach((section) => {
  observer.observe(section);
});