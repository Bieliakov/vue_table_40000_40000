<template>
  <div class="table-cell">
    <div class="table-cell__row">
      <label>
        <input type="checkbox"
               v-model="cellValue.disabled"
               @change="$v.disable.$touch()"/>
        Disable Input
      </label>
    </div>
    <div class="table-cell__row">
      <label>
        Number
        <input type="number"
               v-model.number="cellValue.inputValue"
               :disabled="cellValue.disabled"
               @input="$v.numbersField.$touch()"/>
      </label>
    </div>
    <div class="table-cell__row">
      <button v-if="$v.$anyDirty"
        class="button button-primary"
        @click="saveCellValue">Save</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cellValue: {
        type: Object,
        require: true
      },
      col: {
        type: [String, Number],
        required: true
      },
      row: {
        type: [String, Number],
        required: true
      }
    },
    data() {
      return {
        isSaveButtonEnabled: false,
        initialCellValue: null
      }
    },
    validations: {
      disable: {},
      numbersField: {}
    },
    watch: {
      cellValue() {
        // TODO: handle case when model changed to it's initial state
        this.$v.$reset();
      }
    },
    methods: {
      saveCellValue() {
        console.log('clicked save button for a cell row =', this.row, ', col =', this.col);
        console.log('values are',this.cellValue);
      }
    }
  }
</script>

<style scoped>
  .table-cell__row {
    padding: 5px;
  }
</style>
