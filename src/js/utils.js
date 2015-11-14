export function repeat(val, len) {
  const result = Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = val;
  }

  return result;
}

export function range(low, high) {
  const result = [];
  let i = low;
  while (i < high) {
    result.push(i++);
  }

  return result;
}

export function shuffle(arr) {
  let i = arr.length;
  while (i-- > 0) {
    let rand = Math.random() * i | 0;
    let t = arr[rand];
    arr[rand] = arr[i];
    arr[i] = t;
  }

  return arr;
}
