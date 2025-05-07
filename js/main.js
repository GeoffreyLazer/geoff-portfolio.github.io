const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
  links.classList.toggle('open');
});

// Initialize project card sliders once DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.card-slider').forEach(slider => {
    const slidesContainer = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.card-image');
    let currentIndex = 0;

    // Hide overflow and set container width & slide flex basis
    slidesContainer.style.overflow = 'hidden';
    slidesContainer.style.width = `${slides.length * 100}%`;
    slides.forEach(slide => {
      slide.style.flex = `0 0 ${100 / slides.length}%`;
    });

    // Prev/Next button handlers
    slider.querySelector('.prev-slide').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    });
    slider.querySelector('.next-slide').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    });

    // Auto-cycle on hover
    let hoverInterval;
    slider.addEventListener('mouseenter', () => {
      hoverInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
      }, 2000);
    });
    slider.addEventListener('mouseleave', () => {
      clearInterval(hoverInterval);
    });
  });
});