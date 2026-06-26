document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = Array.from(document.querySelectorAll('.tab-button'));
  const tabPanels = Array.from(document.querySelectorAll('.tab-panel'));
  const allImages = Array.from(document.querySelectorAll('.art-column img'));
  const lightbox = document.querySelector('.art-lightbox');
  const lightboxImage = lightbox.querySelector('.lightbox-image');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;

  const getGalleryImages = () => {
    const activePanel = document.querySelector('.tab-panel.active');
    if (!activePanel) return [];

    const columns = Array.from(activePanel.querySelectorAll('.art-column'));
    if (!columns.length) return [];

    const rows = Math.max(...columns.map((column) => column.querySelectorAll('img').length));
    const images = [];

    for (let row = 0; row < rows; row += 1) {
      columns.forEach((column) => {
        const image = column.querySelectorAll('img')[row];
        if (image) images.push(image);
      });
    }

    return images;
  };

  function updateLightbox(index) {
    const galleryImages = getGalleryImages();
    if (!galleryImages.length) return;
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

  function activateTab(panelId) {
    tabPanels.forEach((panel) => {
      const isActive = panel.id === panelId;
      panel.classList.toggle('active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });

    tabButtons.forEach((button) => {
      const isActive = button.dataset.target === panelId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    currentIndex = 0;
  }

  allImages.forEach((image) => {
    image.addEventListener('click', () => {
      const galleryImages = getGalleryImages();
      const index = galleryImages.indexOf(image);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => activateTab(button.dataset.target));
  });

  activateTab('professional-art');

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