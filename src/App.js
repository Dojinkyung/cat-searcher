import { SearchInput } from "./components/SearchInput.js";
import { SearchResult } from "./components/SearchResult.js";
import { ImageInfo } from "./components/ImageInfo.js";
import { api } from "./api/api.js";
import { DarkMode } from "./utils/DarkMode.js";
import { IsLoading } from "./components/IsLoading.js";
import { Banner } from "./components/Banner.js";
import { SearchedHistory } from "./components/SearchedHistory.js";
import {
  SaveSearchingWords,
  SaveSearchedItems,
  SaveSearchedWords,
  GetSearchedItems,
  GetSearchedWords,
  GetSearchingWords,
} from "./utils/Storage.js";
console.log("app is running!");

export class App {
  $target = null;
  data = [];
  info = null;
  visible = true;
  constructor($target) {
    this.$target = $target;
    this.darkmode = new DarkMode($target);
    this.isLoading = new IsLoading($target);
    if (!GetSearchedWords()) {
      SaveSearchedWords();
    }
    if (!GetSearchedItems()) {
      SaveSearchedItems();
    }
    if (!GetSearchingWords()) {
      SaveSearchingWords();
    }

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        SaveSearchingWords(keyword);
        this.visible = false;
        this.isLoading.toggleLoader();
        const { data } = await api.fetchCats(keyword);
        this.setState(data);
        SaveSearchedItems(data);
        this.isLoading.toggleLoader();
      },
      onRandom: async () => {
        this.visible = false;
        this.isLoading.toggleLoader();
        const { data } = await api.fetchAll();
        this.setState(data);
        SaveSearchedItems(data);
        this.isLoading.toggleLoader();
      },
    });
    this.banner = new Banner({
      $target,
      data: this.data,
      onVisible: async () => {
        const { data } = await api.fetchAll();
        this.setState(data);
      },
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
    if (this.visible) {
      this.banner.setState(nextData);
    } else {
      this.searchResult.setState(nextData);
    }
  }
}
