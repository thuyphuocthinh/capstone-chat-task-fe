let debounceTimer: ReturnType<typeof setTimeout>;

export const debounce_search = (value: string, callback: Function, delay = 300): void => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    callback(value);
  }, delay);
};
