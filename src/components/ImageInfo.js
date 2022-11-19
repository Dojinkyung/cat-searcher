export class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

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
      this.$imageInfo.innerHTML = `
        <section class="content-wrapper">
          <header class="title">
            <span>${name}</span>
            <button class="close">x</button>
          </header>
          <section class="info">
          <img src="${url}" alt="${name}"/>        
          <ul class="description">
            <li>성격: ${temperament}</li>
            <li>태생: ${origin}</li>
          </ul>
          </section>
        </section>`;
      this.$imageInfo.style.display = "block";
      const closeBtn = this.$imageInfo.querySelector(".close");
      const modalWapper = document.querySelector(".content-wapper");
      const outside = this.$imageInfo;
      window.addEventListener("click", (e) => {
        if (e.target === outside) {
          this.$imageInfo.style.display = "none";
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && this.$imageInfo.style.display !== "none") {
          this.$imageInfo.style.display = "none";
        }
      });
      closeBtn.addEventListener("click", () => {
        this.$imageInfo.style.display = "none";
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
