const slider = document.getElementById('our-yachts-list');
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let currentIndex = 0;
let isDragging = false;

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function touchStart(event) {
  isDragging = true;
  startX = event.touches[0].clientX;
  slider.style.transition = 'none';
}

function touchMove(event) {
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
  setSliderPosition();
}

function touchEnd() {
  isDragging = false;
  const containerWidth = document.querySelector('.our-yachts-container').clientWidth;
  const visibleSlides = getVisibleSlidesCount();
  const gap = getGapSize();

  const slideWidth = (containerWidth - (gap * (visibleSlides - 1))) / visibleSlides;

  if (currentTranslate - prevTranslate < -50 && currentIndex < slider.children.length - visibleSlides) {
    currentIndex++;
  }
  if (currentTranslate - prevTranslate > 50 && currentIndex > 0) {
    currentIndex--;
  }

  prevTranslate = -currentIndex * (slideWidth + gap);
  currentTranslate = prevTranslate;
  slider.style.transition = 'transform 0.3s ease';
  setSliderPosition();
}

function getVisibleSlidesCount() {
  const width = window.innerWidth;
  if (width >= 1280) return 3;
  if (width >= 768) return 2;
  return 1;
}

function getGapSize() {
  const width = window.innerWidth;
  if (width >= 1280) return 24;
  return 32;
}

if (window.innerWidth <= 1280) {
  slider.addEventListener('touchstart', touchStart);
  slider.addEventListener('touchmove', touchMove);
  slider.addEventListener('touchend', touchEnd);
}
