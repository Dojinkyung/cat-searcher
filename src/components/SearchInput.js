import { GetSearchingWords, GetSearchedWords } from "../utils/storage.js";

export class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    this.data = GetSearchedWords();
    this.history = null;
    const $inputBtnWapper = document.createElement("div");
    $inputBtnWapper.className = "inputBtn-Wapper";
    $target.appendChild($inputBtnWapper);
    this.onSearch = onSearch;
    this.onRandom = onRandom;
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    if (GetSearchingWords().length > 0) {
      this.$searchInput.value = GetSearchingWords();
    }
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    this.$searchInput.autofocus = true;
    $inputBtnWapper.appendChild($searchInput);

    const $randomBtn = document.createElement("button");
    this.$randomBtn = $randomBtn;
    this.$randomBtn.innerHTML = "랜덤  |";
    $randomBtn.className = "randomBtn";
    $inputBtnWapper.appendChild($randomBtn);

    this.render();
    console.log("SearchInput created.", this);
  }
  setState(nextData) {
    this.history = nextData;
    this.$searchInput.value = this.history;
  }
  render() {
    this.$searchInput.addEventListener("click", (e) => {
      if (e.target.value.length >= 1) {
        e.target.value = "";
      }
    });
    this.$searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.onSearch(e.target.value);
      }
    });
    this.$randomBtn.addEventListener("click", (e) => {
      this.onRandom();
      this.$searchInput.value = "";
    });
  }
}
