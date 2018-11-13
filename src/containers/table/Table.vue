<template>
  <div class="app-table border" ref="scrollEventContainer">

    <div class="app-table-row">
      <div :style="{height: headingCol.height + 'px', width: headingRow.width + 'px'}"
           class="border-cell">
      </div>
      <div v-for="headingColNumber in headingCol.values"
           class="heading-cell-container heading-cell-container_col border-cell"
           :style="{height: headingCol.height + 'px', width: cellSizeX + 'px'}" >
        <div>
          {{headingColNumber}}
        </div>
      </div>
    </div>

    <div class="app-table-row">
      <div class="heading-rows-container">
        <div v-for="headingRowNumber in headingRow.values"
             class="heading-cell-container heading-cell-container_row border-cell"
             :style="{height: cellSizeY + 'px', width: headingRow.width + 'px'}" >
          <div>
            {{headingRowNumber}}
          </div>
        </div>
      </div>

      <div class="cells-container">
        <div v-for="headingCol in headingCol.values"
             class="cells-row-container">
            <div v-for="headingRow in headingRow.values"
                 class="cells-cell-container border-cell"
                 :style="{width: cellSizeX + 'px', height: cellSizeY + 'px'}">
              <app-table-cell :col="headingCol"
                              :row="headingRow"
                              :cellValue="getCellValue({col: headingCol, row: headingRow })">
              </app-table-cell>
          </div>
        </div>
      </div>
    </div>

    <scroller-horizontal :parentRefs="$refs"
                         :depthSize="scrollSize"
                         :mainSize="visibleCellsAreaX"
                         :style="{ left: headingRow.width + 'px' }"
                         @positionUpdated="updateScrollHorizontalPositions($event)">
    </scroller-horizontal>
    <scroller-vertical :parentRefs="$refs"
                         :depthSize="scrollSize"
                         :mainSize="visibleCellsAreaY"
                         :style="{ top: headingCol.height + 'px' }"
                         @positionUpdated="updateScrollVerticalPositions($event)">
    </scroller-vertical>
  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex';
  import helpers from '../../helpers';

  // components
  import AppTableCell from './TableCell.vue';
  import ScrollerHorizontal from '../../components/scroller/horizontal/ScrollerHorizontal.vue';
  import ScrollerVertical from '../../components/scroller/vertical/ScrollerVertical.vue';

  export default {
    components: {
      ScrollerHorizontal,
      ScrollerVertical,
      AppTableCell,
    },

    data() {
      return {
        updatingFirstCellNumber: {
          horizontal: null,
          vertical: null
        }
      }
    },
    computed: {
      ...mapGetters([
        'scrollSize'
      ]),
      ...mapGetters('table', [
        'headingCol',
        'headingRow',
        'visibleCellsQuantityX',
        'visibleCellsQuantityY',
        'cellSizeX',
        'cellSizeY',
        'getCellValue',
        'visibleCellsAreaX',
        'visibleCellsAreaY',
        'rowsQuantity',
        'colsQuantity'
      ]),
    },
    mounted() {
      // TODO: handling resize
      // get and set visible cells quantity for x and y dimentions
      const fullSizes = {
        y: this.$el.clientHeight,
        x: this.$el.clientWidth
      };

      this.setFullSizes(fullSizes);
      this.updateTable({rows: this.visibleCellsQuantityY, cols: this.visibleCellsQuantityX});
    },
    methods: {
      ...mapActions('table', {
        setFullSizes : 'setFullSizes',
        updateTable: 'updateTable',
        updateHorizontalScrollPositions: 'updateHorizontalScrollPositions',
        updateVerticalScrollPositions: 'updateVerticalScrollPositions'
      }),
      updateScrollVerticalPositions(positions) {
        const direction = 'vertical';
        this.updateVerticalScrollPositions(positions);

        const options = this.$_getOptionsForUpdate_({
          oldFirstCellNumber: +this.headingRow.values[0],
          quantityFull: this.rowsQuantity,
          quantityVisible: this.visibleCellsQuantityY,
          percentage: positions.current.percentage
        });

        // update if it is needed and if it is not already updating for current set of cells
        if(options.newFirstCellNumber && options.newFirstCellNumber !== this.updatingFirstCellNumber[direction]){
          this.updatingFirstCellNumber[direction] = options.newFirstCellNumber;
          this.updateTable({rows: options.newHeadings, cols: this.headingCol.values})
        }
      },
      updateScrollHorizontalPositions(positions) {
        const direction = 'horizontal';
        this.updateHorizontalScrollPositions(positions);

        const options = this.$_getOptionsForUpdate_({
          oldFirstCellNumber: +this.headingCol.values[0],
          quantityFull: this.colsQuantity,
          quantityVisible: this.visibleCellsQuantityX,
          percentage: positions.current.percentage
        });

        // update if it is needed and if it is not already updating for current set of cells
        if(options.newFirstCellNumber && options.newFirstCellNumber !== this.updatingFirstCellNumber[direction]){
          this.updatingFirstCellNumber[direction] = options.newFirstCellNumber;
          this.updateTable({cols: options.newHeadings, rows: this.headingRow.values})
        }
      },
      $_getOptionsForUpdate_({oldFirstCellNumber, quantityFull, quantityVisible, percentage}) {
        // visibleCellsQuantity for a case of displaying last elements in table
        let visibleCellsQuantity = quantityVisible;
        let newFirstCellNumber = Math.floor(quantityFull * percentage / 100);

        // handling cases if newFirstCellNumber is a starting one or at the and of the table
        if ((newFirstCellNumber === oldFirstCellNumber) || (newFirstCellNumber === 0 && oldFirstCellNumber === 1)) {
          newFirstCellNumber = null;
        } else if (newFirstCellNumber === 0 && oldFirstCellNumber !== 1) {
          newFirstCellNumber = 1;
        } else if (newFirstCellNumber === quantityFull - quantityVisible) {
          newFirstCellNumber = quantityFull - quantityVisible;
        } else if (newFirstCellNumber > quantityFull - quantityVisible + 1) {
          newFirstCellNumber = quantityFull - quantityVisible + 2;
          visibleCellsQuantity = quantityVisible - 1;
        }

        const newHeadings = helpers.rangeArray(visibleCellsQuantity, newFirstCellNumber);

        return {
          newHeadings,
          newFirstCellNumber
        };
      },
    }
  }


</script>

<style scoped>
  .app-table {
    width: 90vw;
    box-sizing: border-box;
    height: 90vh;
    margin: 10px;
    padding: 0;
    overflow: hidden;
    position: relative;
  }

  .heading-cell-container {
    background-color: rgba(144,238,144, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border-cell {
    border-bottom: 1px solid lightseagreen;
    border-right: 1px solid lightseagreen;
  }

  .heading-rows-container {
    display: inline-flex;
    flex-direction: column;
  }

  .cells-container {
    display: inline-flex;
    position: relative;
  }

  .app-table-row {
    display: inline-flex;
  }
  .app-table-row:nth-child(n+1) {
    margin-top: -4px;
  }


</style>

