export class IsLoading {
  constructor($target) {
    this.isLoadingWapper = document.createElement("div");
    this.isLoadingWapper.className = "isLoading-wapper";
    this.isLoadingWapper.classList.add("hidden");

    $target.appendChild(this.isLoadingWapper);

    this.render();
  }
  toggleLoader() {
    const loader = document.querySelector(".isLoading-wapper");
    loader.classList.toggle("hidden");
  }
  render() {
    const isLoading = document.createElement("p");
    isLoading.className = "isLoading-comment";
    isLoading.innerHTML = "고양이가 뛰어오는 중...";
    this.isLoadingWapper.appendChild(isLoading);
  }
}
