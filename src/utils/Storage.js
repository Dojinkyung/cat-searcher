export const SaveSearchedWords = (string) => {
  window.localStorage.setItem("history", string);
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
  const history = window.localStorage.getItem("history");
  let historyArr = [];
  if (history === "undefined") {
    return historyArr;
  } else {
    historyArr = JSON.parse(history);
    return historyArr;
  }
};
export const GetSearchedItems = () => {
  const Items = window.localStorage.getItem("Items");
  let ItemsObj = [];
  if (Items === "undefined") {
    return ItemsObj;
  } else {
    ItemsObj = JSON.parse(Items);
    return ItemsObj;
  }
};
export const GetSearchingWords = () => {
  const input = window.localStorage.getItem("input");
  if (input === "undefined") {
    return [];
  }
  return input;
};
export const RemoveSearchingWords = () => {
  window.localStorage.removeItem("input");
};
