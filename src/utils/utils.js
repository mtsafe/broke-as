function isNonEmptyArray(variable) {
  return Array.isArray(variable) && variable.length > 0
}
function isNonEmptyString(str) {
  return typeof str === "string" && str !== ""
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

export { isNonEmptyArray, isNonEmptyString, isPlainObject }
