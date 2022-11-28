import { GetSearchedWords, SaveSearchingWords } from "../utils/storage.js";
export class SearchedHistory {
  constructor({ $target, onClick }) {
    this.data = GetSearchedWords();
    this.onClick = onClick;
    const $history = document.createElement("ul");
    this.$history = $history;
    $history.className = "History";
    $target.appendChild($history);
    this.render();
  }
  setState(nextData) {
    this.data = nextData;
    this.render();
  }
  render() {
    if (this.data && this.data.length > 0) {
      this.$history.innerHTML = `${this.data
        .map(
          (cat) => `
            <li class="words">
              <button class="historyWord"value=${cat}>${cat}</button>
            </li>
          `
        )
        .join("")} `;
      this.$history.querySelectorAll(".historyWord").forEach(($item, index) => {
        $item.addEventListener("click", (e) => {
          SaveSearchingWords(e.target.value);
          this.onClick(e.target.value);
        });
      });
    }
  }
}
