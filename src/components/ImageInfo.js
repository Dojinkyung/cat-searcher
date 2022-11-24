import LazyLoading from "../utils/LazyLoading.js";
export class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    this.imageInfo = document.createElement("div");
    this.imageInfo.className = "ImageInfo";
    $target.appendChild(this.imageInfo);

    this.visible = false;
    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    if (this.data.visible) {
      const { name, url } = this.data.image;
      const { temperament, origin } = this.data.detail;
      LazyLoading();
      this.imageInfo.innerHTML = `
        <section class="content-wrapper">
          <header class="title">
            <span>${name}</span>
            <button class="close">x</button>
          </header>
          <section class="info">
          <img src="${url}" alt="${name}" loading="lazy"/>        
          <ul class="description">
            <li>성격: ${temperament}</li>
            <li>태생: ${origin}</li>
          </ul>
          </section>
        </section>`;
      this.visible = true;
      const wrapper = document.querySelector(".ImageInfo");
      const modal = document.querySelector(".content-wrapper");
      modal.classList.add("show");
      wrapper.classList.add("show");

      const closeBtn = this.imageInfo.querySelector(".close");
      const outside = this.imageInfo;

      window.addEventListener("click", (e) => {
        if (e.target === outside) {
          modal.classList.remove("show");
          wrapper.classList.remove("show");
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("show")) {
          modal.classList.remove("show");
          wrapper.classList.remove("show");
        }
      });
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        wrapper.classList.remove("show");
      });
    }
  }
}
