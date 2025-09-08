export function debounce(fn: Function, ms: number) {
  let timeout: number | null = null;

  return (...params: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...params);
      timeout = null;
    }, ms);
  };
}
