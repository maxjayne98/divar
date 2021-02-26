export function objectToUrlParam(obj) {
  return new URLSearchParams(obj).toString();
}
