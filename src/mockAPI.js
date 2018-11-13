import helpers from './helpers';

export default {
  // arguments either number(for initial values) or arrays
  get: ({rows, cols}) => {
    return new Promise((resolve, reject) => {
      if (Number.isInteger(rows) && Number.isInteger(cols)) {
        rows = helpers.rangeArray(rows, 1);
        cols = helpers.rangeArray(cols, 1);
      }

      const response = {};

      rows.map(row => {
        cols.map((col) => {
          if (!response[row]) {
            response[row] = {};
          }
          response[row][col] = getMockedCellValue();
        })
      });

      setTimeout(() => {
        resolve(response);
      }, 500)
    });
  }
}

let disabledFlag = true;

function getMockedCellValue() {
  disabledFlag = !disabledFlag;

  return {
    disabled: disabledFlag,
    inputValue: Math.floor(Math.random() * 1000)
  };
}
