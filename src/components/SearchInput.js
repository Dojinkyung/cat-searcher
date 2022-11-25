const TEMPLATE = '<input type="text">';

export class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const $inputBtnWapper = document.createElement("div");
    $inputBtnWapper.className = "inputBtn-Wapper";
    $target.appendChild($inputBtnWapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    this.$searchInput.autofocus = true;
    $inputBtnWapper.appendChild($searchInput);

    const $randomBtn = document.createElement("button");
    this.$randomBtn = $randomBtn;
    this.$randomBtn.innerHTML = "랜덤  |";
    $randomBtn.className = "randomBtn";
    $inputBtnWapper.appendChild($randomBtn);

    $searchInput.addEventListener("click", (e) => {
      if (e.target.value.length >= 1) {
        e.target.value = "";
      }
    });
    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });
    $randomBtn.addEventListener("click", (e) => {
      onRandom();
    });
    console.log("SearchInput created.", this);
  }
  render() {}
}
