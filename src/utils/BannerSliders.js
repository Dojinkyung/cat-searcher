let slideIndex = 1;
export function plusSlides(n, slides) {
  showSlides((slideIndex += n), slides);
}
export function showSlides(n, slides) {
  let i;
  if (slides) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
  }
}
