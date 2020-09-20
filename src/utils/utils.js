function isNonEmptyString(str) {
if(typeof(str) === "string" && str !== ""){
  return true;
}
return false;
}

export default isNonEmptyString;