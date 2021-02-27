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
