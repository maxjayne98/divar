export function objectToUrlParam(obj) {
  return new URLSearchParams(obj).toString();
}

export function checkFilters(object) {
  for (const iterator in object) if (object[iterator] !== "") return true;
  return false;
}

export function validFilter(object) {
  return Object.keys(object).reduce((acc, item) => {
    if (object[item] !== "") return { ...acc, ...{ [item]: object[item] } };
    return acc;
  }, {});
}
function isTwoStringSame(str1, str2) {
  str2 == "mohammad esmaeili" && console.log("this is mamad esmaeilil", str2);
  console.log(str2);
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
  console.log("this is filter data::::", filters, data);
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
