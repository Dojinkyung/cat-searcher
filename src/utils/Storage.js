export const SaveSearchedWords = (string) => {
  const saved = window.localStorage.getItem("history");
  const keyword = JSON.parse(saved);
  if (!keyword.includes(string)) {
    if (keyword.length < 5) {
      keyword.unshift(string);
    } else {
      keyword.pop();
      keyword.unshift(string);
    }
    const tmp = JSON.stringify(keyword);
    window.localStorage.setItem("history", tmp);
  }
};
export const SaveSearchedItems = (object) => {
  window.localStorage.removeItem("Items");
  const objString = JSON.stringify(object);
  window.localStorage.setItem("Items", objString);
};
export const SaveSearchingWords = (string) => {
  window.localStorage.removeItem("input");
  window.localStorage.setItem("input", string);
};
export const GetSearchedWords = () => {
  const history = JSON.parse(window.localStorage.getItem("history"));
  let historyArr = [];
  if (history === "[]") {
    return historyArr;
  } else {
    historyArr = history;
    return historyArr;
  }
};
export const GetSearchedItems = () => {
  const Items = window.localStorage.getItem("Items");
  let ItemsObj = [];
  if (Items === "") {
    return ItemsObj;
  } else {
    ItemsObj = JSON.parse(Items);
    return ItemsObj;
  }
};
export const GetSearchingWords = () => {
  const input = window.localStorage.getItem("input");
  if (input === "") {
    return [];
  }
  return input;
};
export const RemoveSearchingWords = () => {
  window.localStorage.removeItem("input");
};
export const initializeLocalStorage = () => {
  if (!window.localStorage.getItem("history")) {
    window.localStorage.setItem("history", "[]");
  }
  if (!window.localStorage.getItem("input")) {
    window.localStorage.setItem("input", "");
  }
  if (!window.localStorage.getItem("Items")) {
    window.localStorage.setItem("Items", "");
  }
};
