import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fNumber(number) {
  return numeral(number).format();
}

export function fCurrency(number) {
  const format = number ? numeral(number).format('0,0 đ') : '';

  return result(format, '.00');
}

export function fPercent(number) {
  const format = number ? numeral(Number(number) / 100).format('0.0%') : '';

  return result(format, '.0');
}

export function fShortenNumber(number) {
  if (number === 0) return '0'; // Xử lý trường hợp số đầu vào là 0

  if (!number) return '';

  if (number < 1000) {
    return numeral(number).format('0a');
  } else if (number < 1000000) {
    return numeral(number / 1000).format('0a') + 'N';
  } else {
    const millionPart = Math.floor(number / 1000000);
    const remainder = number % 1000000;
    if (remainder === 0) {
      return millionPart + 'Tr';
    } else {
      return millionPart + 'Tr' + numeral(remainder / 1000).format('0a');
    }
  }
}

export function fData(number) {
  const format = number ? numeral(number).format('0.0 b') : '';

  return result(format, '.0');
}

function result(format, key = '.00') {
  const isInteger = format.includes(key);

  return isInteger ? format.replace(key, '') : format;
}
