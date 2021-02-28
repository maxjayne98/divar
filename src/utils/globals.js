export function objectToUrlParam(obj) {
  return new URLSearchParams(obj).toString();
}

export function checkFilters(object) {
  for (const iterator in object) if (object[iterator] !== "") return true;
  return false;
}

export function isAcceptedFilter(filter) {
  const filters = ["field", "date", "name", "title"];
  return filters.filter((i) => i === filter);
}

export function validFilter(object) {
  return Object.keys(object).reduce((acc, item) => {
    if (object[item] !== "" && isAcceptedFilter(item).length >= 1)
      return { ...acc, ...{ [item]: object[item] } };
    return acc;
  }, {});
}

export function isTwoObjectSame(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
export function insertParamsToUrl(obj) {
  window.history.replaceState(null, null, objectToUrlParam(obj));
}
export function removeParametersFromUrl() {
  window.history.replaceState(null, null, "/");
}
function isTwoStringSame(str1, str2) {
  if (str1.length < str2.length) {
    return false;
  }
  for (let i = 0; i < str2.length; i++) {
    if (str1[i] !== str2[i]) {
      return false;
    }
  }
  return true;
}

export function filterData(filters, data) {
  if (filters.length <= 0 || data.length <= 0) {
    return [];
  }
  for (let filter of Object.keys(filters)) {
    for (let j = 0; j < data.length; j++) {
      if (
        !isTwoStringSame(
          data[j][filter].toLowerCase(),
          filters[filter].toLowerCase()
        )
      ) {
        data.splice(j, 1);
        j--;
      }
    }
  }
  return data;
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

export function createFilterObject(arr) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === "") {
      return {};
    }
  }
  return arr.reduce((acc, item) => {
    const splited = item.split("=");
    return { ...acc, [splited[0]]: decodeURI(splited[1]) };
  }, {});
}

export function whatIsFieldNextState(value) {
  console.log("in helper function", value);
  if (value === "none") {
    return "asc";
  } else if (value === "asc") {
    return "des";
  } else {
    return "none";
  }
}
