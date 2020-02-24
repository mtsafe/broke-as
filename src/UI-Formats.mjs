// Formatting functions for UI display

/**
 * Number.prototype.formatNum(n, x, s, c)
 *  (converts a number to a string)
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 * 
 * Samples:
 * 12345678.9.formatNum(2, 3, '.', ',');  // "12.345.678,90"
 * 123456.789.formatNum(4, 4, ' ', ':');  // "12 3456:7890"
 * 12345678.9.formatNum(0, 3, '-');       // "12-345-679"
 */
Number.prototype.formatNum = function(n, x, s, c) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(
    new RegExp(re, 'g'), '$&' + (s || ','));
};

// Converts a number representation of int cents
// to a string representation of float dollars.
function centsToDollars(amt) {
  let x = amt / 100;
  return x.formatNum(2, 3, ',', '.');
};

// Converts a string representation of float dollars
// to a string representation of int cents.
function dollarsToCents(amt) {
  let str = amt.match(/\d+\.?\d*/);
  str = Number(str).toFixed(2);
  return str.match(/\d/g).join("");
};
export { centsToDollars, dollarsToCents } ;