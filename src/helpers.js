export const sortArr = (arr, props) => {
  return arr.sort((a, b) => {
    if (b?.[props] > a?.[props]) {
      return -1;
    } else if (b?.[props] < a?.[props]) {
      return 1;
    }
    return 0;
  });
};
