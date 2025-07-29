const carousel = document.querySelector('.galery__carousel');
const carouselItems = carousel.querySelector('.carousel__items');
const carouselItem = carouselItems.firstElementChild;

function debounce(time, callback) {
  let timer = 0;

  return () => {
    window.clearTimeout(timer);

    timer = window.setTimeout(callback, time);
  };
}

const createDots = () => {
  const dots = [];

  for (let i = 0; i < carouselItems.childElementCount; i++) {
    const dot = document.createElement('div');

    dot.classList.add('carousel__dot');
    dot.dataset.slideIndex = i;

    dot.addEventListener('click', clickOnDot);

    dots.push(dot);
  }

  carousel.querySelector('.carousel__dots').append(...dots);
};

const clickOnDot = (e) => {
  const slideIndex = e.target.dataset.slideIndex;

  carouselItems.scrollTo({ left: slideIndex * carouselItem.offsetWidth });
};

const changeActiveDot = () => {
  const allDots = carousel.querySelectorAll('.carousel__dot');
  const activeDot = carousel.querySelector('.carousel__dot--active');

  const selectedDotIndex = Math.round(
    carouselItems.scrollLeft / carouselItem.offsetWidth,
  );

  if (activeDot) {
    activeDot.classList.remove('carousel__dot--active');
  }

  allDots[selectedDotIndex].classList.add('carousel__dot--active');
};

function initCarousel() {
  createDots();
  changeActiveDot();

  carouselItems.addEventListener('scroll', changeActiveDot);
}

export default initCarousel;
