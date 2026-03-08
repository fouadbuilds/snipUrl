function convertToBase62(num: number) {
  const base62Digits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (num === 0) return base62Digits[0];
  let base62 = "";
  while (num > 0) {
    base62 += base62Digits[num % 62];
    num = Math.floor(num / 62);
  }
  return base62.split('').reverse().join('');
}

function decodeBase62(base62: string) {
  const base62Digits =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let decodedValue = 0;
  for (let i = 0; i < base62.length; i++) {
    decodedValue = decodedValue * 62 + base62Digits.indexOf(base62[i]);
  }
  return decodedValue;
}

export {convertToBase62, decodeBase62}