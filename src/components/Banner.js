import LazyLoading from "../utils/LazyLoading.js";
import { plusSlides, showSlides } from "../utils/BannerSliders.js";
export class Banner {
  $imageInfo = null;
  data = null;
  visible = true;
  constructor({ $target, data, onVisible, onClick }) {
    this.banner = document.createElement("section");
    this.banner.className = "HomeBanner";
    $target.appendChild(this.banner);
    this.data = data;
    this.onClick = onClick;
    if (this.visible) {
      onVisible();
    }
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length > 0) {
      LazyLoading();
      const tmp = this.data.slice(0, 5);

      this.banner.innerHTML = `${tmp
        .map(
          (cat) => `
          <li class="mySlides fade">
            <div class="text">${cat.name}</div>
            <img  style="width:100%" src=${cat.url} alt=${cat.name} loading='lazy' class="lazy"/>
          </li>
        `
        )
        .join("")}
        <a class="prev">&#10094;</a>
        <a class="next">&#10095;</a> `;
      let slides = document.querySelectorAll(".mySlides");
      if (slides.length > 0) {
        showSlides(1, slides);
        console.log(slides);
        const prev = document.querySelector(".prev");
        prev.addEventListener("click", () => {
          plusSlides(-1, slides);
        });
        const next = document.querySelector(".next");
        next.addEventListener("click", () => {
          plusSlides(1, slides);
        });
        slides.forEach(($item, index) => {
          $item.addEventListener("click", () => {
            this.onClick(this.data[index]);
          });
        });
      }
    }
  }
}
