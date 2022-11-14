export class DarkMode {
  constructor($target) {
    const template = `
    <div class="darkmode">
    <input type="checkbox" class="checkbox" id="chk" />
    <label class="label" for="chk">
      <p class="fas fa-moon">🌚</p>
      <p class="fas fa-sun">🌞</p>
      <div class="ball"></div>
    </label>
  </div>
  
    `;
    $target.innerHTML += template;
    this.render();
  }
  changeMode() {
    if (document.body.classList.value === "") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.body.classList.add("light");
      } else {
        document.body.classList.add("dark");
      }
    } else {
      document.body.classList.toggle("light");
      document.body.classList.toggle("dark");
    }
  }
  render() {
    const chk = document.getElementById("chk");
    chk.addEventListener("change", () => {
      this.changeMode();
    });
  }
}
