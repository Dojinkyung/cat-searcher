import { SearchInput } from "./components/SearchInput.js";
import { SearchResult } from "./components/SearchResult.js";
import { ImageInfo } from "./components/ImageInfo.js";
import { api } from "./api/api.js";
import { DarkMode } from "./utils/DarkMode.js";
import { IsLoading } from "./components/IsLoading.js";

console.log("app is running!");

export class App {
  $target = null;
  data = [];
  info = null;
  constructor($target) {
    this.$target = $target;

    this.darkmode = new DarkMode($target);

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.isLoading.toggleLoader();
        const { data } = await api.fetchCats(keyword);
        this.setState(data);
        this.isLoading.toggleLoader();
      },
      onRandom: async () => {
        this.isLoading.toggleLoader();
        const { data } = await api.fetchAll();
        this.setState(data);
        this.isLoading.toggleLoader();
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.isLoading.toggleLoader();
        const catID = await api.fetchID(image.id);
        const detail = catID.data;
        this.isLoading.toggleLoader();
        this.imageInfo.setState({
          visible: true,
          image,
          detail,
        });
      },
    });
    this.isLoading = new IsLoading($target);
    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
        detail: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
