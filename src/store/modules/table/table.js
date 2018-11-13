import mockAPI from '../../../mockAPI';

const state = {
  // cellRowsData in format {
  //  1[rowKey]: {
  //    5[colKey]: {
  //      disabled: Boolean,
  //      inputValue: Number
  //    }
  //  }
  // }
  cellRowsData: {},
  sizes: {
    table: {
      rows: 40000,
      cols: 40000,
      pixels: {
        x: 0,
        y: 0
      }
    },
    cell: {
      x: 200,
      y: 150
    },
    visibleCellsArea: {
      x: 200,
      y: 200
    },
  },
  headings: {
    cols: {
      values: [1,2,3,4,5,6,7,8,9],
      height: 40
    },
    rows: {
      values: [1,2,3,4,5,6,7,8,9],
      width: 40,
    }
  },
  // scrollPositions[direction] in format {
  //  previous: { pixels: Number, percentage: Number (0-100)}
  //  current: { pixels: Number, percentage: Number (0-100)}
  // }
  scrollPositions: {
    horizontal: {},
    vertical: {}
  }
};

const getters = {
  headingCol(state) {
    return state.headings.cols;
  },
  headingRow(state) {
    return state.headings.rows;
  },
  fullSizes(state) {
    return state.sizes.table.pixels;
  },

  cellSizeX(state) {
    return state.sizes.cell.x;
  },
  cellSizeY(state) {
    return state.sizes.cell.y;
  },
  visibleCellsAreaX(state, getters, rootState, rootGetters) {
    return getters.fullSizes.x - getters.headingRow.width - rootGetters.scrollSize;
  },
  visibleCellsAreaY(state, getters, rootState, rootGetters) {
    return getters.fullSizes.y - getters.headingCol.height - rootGetters.scrollSize;
  },
  visibleCellsQuantityX(state, getters) {
    return Math.ceil(getters.visibleCellsAreaX / getters.cellSizeX);
  },
  visibleCellsQuantityY(state, getters) {
    return Math.ceil(getters.fullSizes.y / getters.cellSizeY);
  },
  getCellValue(state) {
    return ({col, row}) => {
      // guard for a case when there are no data in cellRowsData
      if (state.cellRowsData[row]) {
        return state.cellRowsData[row][col];
      }
      // TODO: change it to some initial value
      return {
        inputValue: 0,
        disabled: false
      }
    }
  },
  colsQuantity(state) {
    return state.sizes.table.cols;
  },
  rowsQuantity(state) {
    return state.sizes.table.rows;
  },
};

const mutations = {
  setFullSizes(state, fullSizes) {
    state.sizes.table.pixels = fullSizes;
  },
  setCellRowsData(state, cellRowsData) {
    state.cellRowsData = cellRowsData;
  },
  setHeadingValues(state, {rowValues, colValues}) {
    state.headings.rows.values = rowValues;
    state.headings.cols.values = colValues;
  },
  setHorizontalScrollPositions(state, payload) {
    state.scrollPositions.horizontal = payload;
  },

  setVerticalScrollPositions(state, payload) {
    state.scrollPositions.vertical = payload;
  },
};

const actions = {
  setFullSizes({commit}, payload) {
    commit('setFullSizes', payload)
  },
  updateTable({commit}, payload) {
    return mockAPI.get(payload).then(res => {
      const rowValues = Object.keys(res);
      // cols have same values for every row, so take first row values
      const colValues = Object.keys(res[rowValues[0]]);
      commit('setCellRowsData', res);
      commit('setHeadingValues', {rowValues, colValues});
    })
  },

  updateHorizontalScrollPositions({commit}, payload) {
    commit('setHorizontalScrollPositions', payload);
  },

  updateVerticalScrollPositions({commit}, payload) {
    commit('setVerticalScrollPositions', payload);
  }

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
