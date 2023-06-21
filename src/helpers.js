export const sortArr = (arr, props) => {
  if (props) {
    return arr.sort((a, b) => {
      if (b?.[props] > a?.[props]) {
        return -1;
      } else if (b?.[props] < a?.[props]) {
        return 1;
      }
      return 0;
    });
  }
  return arr.sort();
};

export const arrTotQn = (arr, qn, val) => {
  return arr
    ?.map((data) => {
      if (data?.[qn] && data?.[qn] === val) {
        return data?.[qn];
      }
      return [];
    })
    ?.filter((data) => data?.length !== 0);
};

export const configChart = (data) => {
  return {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    legend: {
      position: "bottom",
    },
    label: {
      type: "outer",
      content: "{name} {percentage} - {value} mahasiswa",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
};
