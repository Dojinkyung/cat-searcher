import LazyLoading from "../utils/LazyLoading.js";
export class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.length > 0) {
      LazyLoading();
      this.$searchResult.innerHTML = this.data
        .map(
          (cat) => `
          <li class="item">
            <div class="hover-name">${cat.name}</div>
            <img src=${cat.url} alt=${cat.name} loading='lazy' class="lazy"/>
          </li>
        `
        )
        .join("");

      this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          this.onClick(this.data[index]);
        });
      });
    } else {
      const noResult = document.createElement("p");
      this.$searchResult.innerHTML = "";
      noResult.className = "noResult-comment";
      noResult.innerHTML = "고양이가 없습니다";
      this.$searchResult.appendChild(noResult);
    }
  }
}
