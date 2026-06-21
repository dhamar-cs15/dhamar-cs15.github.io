document.addEventListener('DOMContentLoaded', () => {
  const galleryImages = Array.from(document.querySelectorAll('.art-grid img'));
  const lightbox = document.querySelector('.art-lightbox');
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  function updateLightbox(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    const sourceImage = galleryImages[currentIndex];
    lightboxImage.src = sourceImage.src;
    lightboxImage.alt = sourceImage.alt || `Artwork ${currentIndex + 1}`;
    lightboxCaption.textContent = sourceImage.alt || `Artwork ${currentIndex + 1}`;
  }

  function openLightbox(index) {
    updateLightbox(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  galleryImages.forEach((image, index) => {
    image.addEventListener('click', () => openLightbox(index));
  });

  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', () => updateLightbox(currentIndex - 1));
  nextButton.addEventListener('click', () => updateLightbox(currentIndex + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('active')) return;

    if (event.key === 'Escape') {
      closeLightbox();
    }
    if (event.key === 'ArrowLeft') {
      updateLightbox(currentIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      updateLightbox(currentIndex + 1);
    }
  });
});